import { useState } from 'react';
import { Calendar, Clock, Users, Check, ArrowRight } from 'lucide-react';

export default function BookingSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    occasion: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would integrate with your backend/WhatsApp API
  };

  if (submitted) {
    return (
      <section id="booking" className="py-20 lg:py-28 bg-bg-secondary">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="gradient-card border border-accent/30 rounded-3xl p-10 lg:p-14">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
              <Check className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-4">
              Réservation Confirmée !
            </h3>
            <p className="text-text-secondary text-base leading-relaxed mb-6">
              Merci {formData.name || 'cher client'} ! Votre table pour {formData.guests} personne(s)
              le {formData.date || 'date à confirmer'} à {formData.time || 'heure à confirmer'}
              a bien été enregistrée. Vous recevrez une confirmation par WhatsApp sous peu.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-full transition-all"
            >
              Nouvelle Réservation
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 lg:py-28 bg-bg-secondary relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-accent text-sm font-medium tracking-wider uppercase">
            Réservation
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mt-3 mb-4">
            Réservez Votre Table
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-base sm:text-lg">
            Plus d'attente interminable. Réservez en 30 secondes et garantissez votre place
            au rooftop le plus exclusif de Douala.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="gradient-card border border-border rounded-3xl p-6 sm:p-8 lg:p-10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="sm:col-span-2">
                  <label className="block text-text-secondary text-sm font-medium mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Votre nom"
                    className="w-full px-4 py-3 bg-bg-primary border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all text-sm"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-text-secondary text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    className="w-full px-4 py-3 bg-bg-primary border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all text-sm"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-text-secondary text-sm font-medium mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+237 6XX XXX XXX"
                    className="w-full px-4 py-3 bg-bg-primary border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all text-sm"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-text-secondary text-sm font-medium mb-2">
                    <Calendar className="w-3.5 h-3.5 inline mr-1.5 text-accent" />
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-bg-primary border border-border rounded-xl text-text-primary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all text-sm"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-text-secondary text-sm font-medium mb-2">
                    <Clock className="w-3.5 h-3.5 inline mr-1.5 text-accent" />
                    Heure *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-bg-primary border border-border rounded-xl text-text-primary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all text-sm"
                  >
                    <option value="">Choisir l'heure</option>
                    <option value="17:00">17:00</option>
                    <option value="18:00">18:00</option>
                    <option value="19:00">19:00</option>
                    <option value="20:00">20:00</option>
                    <option value="21:00">21:00</option>
                    <option value="22:00">22:00</option>
                    <option value="23:00">23:00</option>
                  </select>
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-text-secondary text-sm font-medium mb-2">
                    <Users className="w-3.5 h-3.5 inline mr-1.5 text-accent" />
                    Nombre de personnes *
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-bg-primary border border-border rounded-xl text-text-primary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all text-sm"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'personne' : 'personnes'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Occasion */}
                <div className="sm:col-span-2">
                  <label className="block text-text-secondary text-sm font-medium mb-2">
                    Occasion (optionnel)
                  </label>
                  <select
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-bg-primary border border-border rounded-xl text-text-primary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all text-sm"
                  >
                    <option value="">Sélectionner</option>
                    <option value="dinner">Dîner d'affaires</option>
                    <option value="birthday">Anniversaire</option>
                    <option value="date">Rendez-vous romantique</option>
                    <option value="group">Soirée entre amis</option>
                    <option value="corporate">Événement corporate</option>
                    <option value="other">Autre</option>
                  </select>
                </div>

                {/* Notes */}
                <div className="sm:col-span-2">
                  <label className="block text-text-secondary text-sm font-medium mb-2">
                    Notes spéciales
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Allergies, préférences de placement, demandes spéciales..."
                    className="w-full px-4 py-3 bg-bg-primary border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all text-sm resize-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full mt-6 px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                Confirmer la Réservation
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Quick Info Card */}
            <div className="gradient-card border border-border rounded-2xl p-6">
              <h3 className="text-text-primary font-semibold text-lg mb-4">Pourquoi réserver ?</h3>
              <ul className="space-y-4">
                {[
                  'Table garantie sans attente',
                  'Placement privilégié rooftop',
                  'Confirmation instantanée WhatsApp',
                  'Service personnalisé dès votre arrivée',
                  'Possibilité de pré-commander',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-text-secondary text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Groups Card */}
            <div className="gradient-card border border-accent/20 rounded-2xl p-6 bg-accent/5">
              <h3 className="text-text-primary font-semibold text-lg mb-2">
                Groupes & Événements Privés
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                Vous êtes plus de 10 ? Organisez votre événement privé avec menu personnalisé,
                décoration et DJ exclusif.
              </p>
              <a
                href="https://wa.me/237000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:underline"
              >
                Contacter sur WhatsApp
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
