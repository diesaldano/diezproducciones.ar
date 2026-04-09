'use client';

import { useState } from 'react';
import type { Drink } from '@/lib/types';

type DrinksManagerProps = {
  eventId: string;
  drinks: Drink[];
  onUpdate: () => void;
};

export function DrinksManager({ eventId, drinks, onUpdate }: DrinksManagerProps) {
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/events/${eventId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add-drink',
          name: form.name,
          description: form.description || undefined,
          price: Number(form.price),
          category: form.category || undefined,
          stock: form.stock ? Number(form.stock) : undefined,
        }),
      });

      if (!res.ok) {
        throw new Error('Error al agregar bebida');
      }

      setForm({ name: '', description: '', price: '', category: '', stock: '' });
      setAdding(false);
      onUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async (drinkId: string) => {
    if (!confirm('¿Eliminar esta bebida?')) return;

    try {
      const res = await fetch(`/api/admin/events/${eventId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'remove-drink', drinkId }),
      });

      if (!res.ok) {
        throw new Error('Error al eliminar bebida');
      }

      onUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  const inputClass =
    'w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Bebidas ({drinks.length})
        </h3>
        <button
          onClick={() => setAdding(!adding)}
          className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 font-medium px-4 py-2 rounded-lg text-sm transition-colors"
        >
          {adding ? 'Cancelar' : '+ Agregar bebida'}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {adding && (
        <form onSubmit={handleAdd} className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input name="name" required value={form.name} onChange={handleChange} placeholder="Nombre *" className={inputClass} />
            <input name="category" value={form.category} onChange={handleChange} placeholder="Categoría (ej: Cerveza)" className={inputClass} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <input name="price" type="number" min="0" required value={form.price} onChange={handleChange} placeholder="Precio *" className={inputClass} />
            <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} placeholder="Stock" className={inputClass} />
            <input name="description" value={form.description} onChange={handleChange} placeholder="Descripción" className={inputClass} />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-black font-medium px-4 py-2 rounded-lg text-sm transition-colors"
          >
            {saving ? 'Guardando...' : 'Agregar'}
          </button>
        </form>
      )}

      {drinks.length === 0 ? (
        <p className="text-zinc-500 text-sm py-4 text-center">No hay bebidas configuradas.</p>
      ) : (
        <div className="space-y-2">
          {drinks.map((drink) => (
            <div
              key={drink.id}
              className="flex items-center justify-between bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium text-sm">{drink.name}</span>
                  {drink.category && (
                    <span className="text-xs text-zinc-500 bg-zinc-700 px-2 py-0.5 rounded">
                      {drink.category}
                    </span>
                  )}
                  {!drink.available && (
                    <span className="text-xs text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
                      No disponible
                    </span>
                  )}
                </div>
                {drink.description && (
                  <p className="text-xs text-zinc-500 mt-0.5">{drink.description}</p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-amber-500 font-semibold text-sm">
                  ${drink.price.toLocaleString('es-AR')}
                </span>
                <button
                  onClick={() => handleRemove(drink.id)}
                  className="text-zinc-500 hover:text-red-400 text-sm transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
