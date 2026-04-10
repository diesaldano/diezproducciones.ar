'use client';

import { useState, useEffect, useRef } from 'react';
import { Mail, CheckCircle, AlertCircle, Loader } from 'lucide-react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'compra-credencial',
    otherSubject: '',
    message: '',
  });

  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // GSAP animations on mount
  useEffect(() => {
    if ((window as any).gsap && sectionRef.current) {
      const gsap = (window as any).gsap;

      gsap.from(sectionRef.current, {
        duration: 0.8,
        opacity: 0,
        y: 40,
        ease: 'power2.out',
      });

      // Animate form elements in sequence
      const inputs = formRef.current?.querySelectorAll('input, textarea, select');
      if (inputs) {
        gsap.from(inputs, {
          duration: 0.6,
          opacity: 0,
          y: 20,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.3,
        });
      }
    }
  }, []);

  const subjectOptions = [
    { value: 'compra-credencial', label: 'Compra de credencial de acceso' },
    { value: 'compra-refrigeracion', label: 'Compra de refrigeración' },
    { value: 'otro', label: 'Otro asunto' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setErrorMessage('El nombre es requerido');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Email inválido');
      return false;
    }

    if (formData.subject === 'otro' && !formData.otherSubject.trim()) {
      setErrorMessage('Especifica el asunto');
      return false;
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      setErrorMessage('El mensaje debe tener al menos 10 caracteres');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateForm()) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject === 'otro' ? formData.otherSubject : formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || 'Error al enviar el mensaje');
        setStatus('error');
        return;
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: 'compra-credencial', otherSubject: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error de conexión. Intenta nuevamente.');
      setStatus('error');
    }
  };

  return (
    <section ref={sectionRef} className="w-full bg-black py-16 md:py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight flex items-center justify-center gap-3">
            <Mail className="w-8 h-8 md:w-10 md:h-10 text-amber-500" />
            CONTACTO
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto">
            ¿Consultas o solicitudes especiales? Escribinos y nos pondremos en contacto lo antes posible.
          </p>
          <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Form */}
        <div className="bg-gradient-to-br from-gray-900/40 to-black/80 backdrop-blur-md p-8 md:p-10 rounded-xl border border-gray-800/50 shadow-2xl">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Nombre completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tu nombre"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all duration-300"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all duration-300"
              />
            </div>

            {/* Subject Select */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                Asunto
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all duration-300"
              >
                {subjectOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Other Subject (conditional) */}
            {formData.subject === 'otro' && (
              <div>
                <label htmlFor="otherSubject" className="block text-sm font-medium text-gray-300 mb-2">
                  Especifica tu asunto
                </label>
                <input
                  type="text"
                  id="otherSubject"
                  name="otherSubject"
                  value={formData.otherSubject}
                  onChange={handleChange}
                  placeholder="Describe tu asunto"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all duration-300"
                />
              </div>
            )}

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Tu consulta o solicitud
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Cuéntanos qué necesitas..."
                rows={5}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all duration-300 resize-none"
              />
            </div>

            {/* Error Message */}
            {status === 'error' && errorMessage && (
              <div className="flex items-center gap-3 p-4 bg-red-900/20 border border-red-800/50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-400">{errorMessage}</p>
              </div>
            )}

            {/* Success Message */}
            {status === 'success' && (
              <div className="flex items-center gap-3 p-4 bg-green-900/20 border border-green-800/50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <p className="text-sm text-green-400">¡Mensaje enviado! Nos contactaremos pronto.</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-gray-600 disabled:to-gray-700 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center gap-2 group"
            >
              {status === 'loading' ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Enviar Mensaje
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
