"use client";

import { useEffect, useRef, useState } from "react";
import {
  type LucideIcon,
  Stethoscope,
  Sparkles,
  Anchor,
  Ruler,
  Crown,
  Siren,
  ArrowRight,
} from "lucide-react";

/* ============================================================
   CABINET DR. BEKADA MED OUSSAMA — Sidi Bel Abbès
   Palette : #F6F4EB / #91C8E4 / #749BC2 / #4682A9
   Fonts   : Poppins (titres) + Roboto (texte)
   ============================================================ */

/* ---- WhatsApp : numéro du cabinet (format international, sans « + ») ---- */
const WHATSAPP_NUMBER = "213780308963";
const WHATSAPP_MESSAGE =
  "Bonjour, je souhaite prendre rendez-vous. Je voudrais avoir plus d’informations concernant vos disponibilités.";

const whatsappUrl = (message: string = WHATSAPP_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

/* Props communes à tous les boutons « rendez-vous » */
const waProps = (message?: string) => ({
  href: whatsappUrl(message),
  target: "_blank" as const,
  rel: "noopener noreferrer",
});

const LOGO_SRC = "/images/logo-cabinet.png";

const NAV = [
  { label: "Accueil", href: "#accueil" },
  { label: "Soins", href: "#soins" },
  { label: "Le cabinet", href: "#cabinet" },
  { label: "Avis", href: "#avis" },
  { label: "Contact", href: "#contact" },
];

type Service = {
  n: string;
  title: string;
  desc: string;
  Icon: LucideIcon;
  urgent?: boolean;
};

const SERVICES: Service[] = [
  {
    n: "01",
    title: "Soins dentaires",
    desc: "Prévention, diagnostic et traitement de vos dents et gencives, au quotidien.",
    Icon: Stethoscope,
  },
  {
    n: "02",
    title: "Esthétique du sourire",
    desc: "Blanchiment, facettes et corrections esthétiques pour un sourire harmonieux.",
    Icon: Sparkles,
  },
  {
    n: "03",
    title: "Implantologie",
    desc: "Remplacement de dents manquantes par des implants, avec un plan de traitement clair.",
    Icon: Anchor,
  },
  {
    n: "04",
    title: "Orthodontie",
    desc: "Alignement dentaire discret, pour les adolescents comme pour les adultes.",
    Icon: Ruler,
  },
  {
    n: "05",
    title: "Prothèses dentaires",
    desc: "Couronnes, bridges et prothèses sur mesure, pensées pour le confort et la durabilité.",
    Icon: Crown,
  },
  {
    n: "06",
    title: "Urgences dentaires",
    desc: "Douleurs, traumatismes ou infection : le cabinet vous reçoit au plus vite.",
    Icon: Siren,
    urgent: true,
  },
];

const WHY = [
  { title: "Approche personnalisée", desc: "Chaque traitement est adapté à vos besoins et à votre situation." },
  { title: "Équipement moderne", desc: "Des équipements adaptés aux soins proposés au cabinet." },
  { title: "Explications claires", desc: "Vous comprenez chaque étape avant de commencer votre traitement." },
  { title: "Suivi attentif", desc: "Un accompagnement avant, pendant et après les soins." },
];

const GALLERY = [
  { src: "/images/logo.webp", alt: "Salle de soin du cabinet dentaire", big: true },
  { src: "/images/dor.webp", alt: "Accueil du cabinet" },
  { src: "/images/art.webp", alt: "Dentiste au travail" },
  { src: "/images/material-2.webp", alt: "Équipement moderne du cabinet" },
  { src: "/images/material.webp", alt: "Détail de l'espace bien-être" },
];

/* Avis Google réels traduits en français — note 5/5 */
const REVIEWS = [
  {
    text: "Le meilleur dentiste de la ville. Je le recommande sans hésitation.",
    name: "Adjel Chaimaa",
  },
  {
    text: "Vous ne soignez pas seulement des dents, vous redonnez aux gens confiance et sourire. C'est un vrai talent. Bravo pour la qualité de votre travail, c'est de l'art à ce niveau. Le meilleur dentiste de la ville ❤️",
    name: "Seddik Sidou",
  },
  {
    text: "Meilleure clinique dentaire, avec un service hautement professionnel. En tant que patient satisfait, je félicite toute l'équipe et lui souhaite un succès continu. Quel plaisir d'avoir une si belle clinique dans notre wilaya, Sidi Bel Abbès !",
    name: "Belfekroun Abdelhadi Mohammed",
  },
  {
    text: "L'accueil est chaleureux, le cabinet est propre et bien organisé. Le docteur est à l'écoute, explique clairement le traitement et travaille avec beaucoup de professionnalisme et de douceur.",
    name: "Fatima Bennabi",
  },
  {
    text: "Une excellente expérience avec un dentiste très gentil, rassurant et attentif. Le traitement a été indolore, réalisé avec une grande précision, et la finition était impeccable. Je suis très satisfaite du résultat.",
    name: "Oumnia Zeir",
  },
  {
    text: "Un dentiste reconnu pour son professionnalisme, sa précision et son excellent suivi des patients. Le cabinet est bien organisé et propre, et le service est de premier ordre.",
    name: "Walid Boutaleb",
  },
];

const INFO = [
  { label: "Formation", value: "Chirurgien-dentiste — [université à compléter]" },
  { label: "Spécialités", value: "Soins généraux, esthétique du sourire, implantologie" },
  { label: "Expérience", value: "[à compléter]" },
];

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [sent, setSent] = useState(false);
  const [waLink, setWaLink] = useState(whatsappUrl());
  const [motif, setMotif] = useState<string>("");
  const menuRef = useRef<HTMLDivElement>(null);

  /* Header scroll state */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Reveal on scroll */
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-stagger");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Lightbox keyboard */
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  /* Mobile menu : fermer sur Escape + verrouiller le scroll */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className={`site-header ${scrolled || menuOpen ? "site-header--solid" : ""}`}>
        <div className="container site-header__inner">
          <a href="#accueil" className="logo" aria-label="Cabinet Dr. Bekada — Accueil">
            <img className="logo__img" src="/images/logo-dz.png" alt="Cabinet dentaire Dr. Bekada" decoding="async" />
          </a>

          <nav className="nav-desktop" aria-label="Navigation principale">
            {NAV.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </nav>

          <a {...waProps()} className="btn btn--primary btn--header">
            Prendre rendez-vous
          </a>

          <button
            className="burger"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={menuOpen ? "is-open" : ""} />
            <span className={menuOpen ? "is-open" : ""} />
          </button>
        </div>

        {/* Drawer mobile */}
        <div
          id="menu-mobile"
          ref={menuRef}
          className={`mobile-drawer ${menuOpen ? "is-open" : ""}`}
          aria-hidden={!menuOpen}
        >
          <nav aria-label="Navigation mobile">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <a {...waProps()} className="btn btn--primary" onClick={() => setMenuOpen(false)}>
              Prendre rendez-vous
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* ================= HERO ================= */}
        <section className="hero" id="accueil">
          <img
            className="hero__bg"
            src="https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1600&q=75"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
          />
          <div className="hero__overlay" aria-hidden="true" />

          <div className="container hero__inner hero__stagger">
            <h1 className="hero__title">
              Votre sourire, avec l'attention qu'il mérite.
            </h1>
            <p className="hero__lead">
              Soins dentaires modernes et personnalisés à Sidi Bel Abbès,
              avec le Dr. Bekada Med Oussama.
            </p>
            <div className="hero__cta">
              <a {...waProps()} className="btn btn--primary btn--lg">Prendre rendez-vous</a>
              <a href="tel:+213780308963" className="btn btn--ghost btn--lg">Appeler le cabinet</a>
            </div>
          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <section className="section" id="soins">
          <div className="container">
            <header className="section__head reveal reveal-stagger">
              <p className="eyebrow">Nos soins</p>
              <h2>Une santé dentaire préservée, un sourire en confiance.</h2>
              <p className="section__intro">
                Des soins adaptés à chaque besoin, avec une approche attentive,
                des explications claires et un accompagnement personnalisé.
              </p>
            </header>

            <div className="services-grid reveal-stagger">
              {SERVICES.map((s) => (
                <article
                  key={s.n}
                  className={`service-card${s.urgent ? " service-card--urgent" : ""}`}
                >
                  <div className="service-card__head">
                    <span className="service-card__icon" aria-hidden="true">
                      <s.Icon size={26} strokeWidth={1.5} />
                    </span>
                    <span className="service-card__meta">
                      {s.urgent && (
                        <span className="service-card__badge">24h/24</span>
                      )}
                      <span className="service-card__num" aria-hidden="true">{s.n}</span>
                    </span>
                  </div>

                  <h3 className="service-card__title">
                    <a
                      {...waProps(
                        `Bonjour, je souhaite prendre rendez-vous pour : ${s.title}. Je voudrais avoir plus d’informations concernant vos disponibilités.`
                      )}
                      className="service-card__link"
                      aria-label={`${s.title} — prendre rendez-vous sur WhatsApp`}
                    >
                      {s.title}
                    </a>
                  </h3>

                  <p className="service-card__desc">{s.desc}</p>

                  <span className="service-card__cta" aria-hidden="true">
                    Prendre rendez-vous
                    <ArrowRight size={16} strokeWidth={1.75} />
                  </span>
                </article>
              ))}
            </div>

            <div className="services-cta reveal">
              <p>Une question sur un soin en particulier ?</p>
              <a {...waProps()} className="services-cta__link">
                Prendre rendez-vous
                <ArrowRight size={16} strokeWidth={1.75} />
              </a>
            </div>
          </div>
        </section>

        {/* ================= PHILOSOPHIE ================= */}
        <section className="section section--tint" id="cabinet">
          <div className="container split split--philosophy">
            <figure className="philosophy__media reveal reveal--media">
              <img
                src="/images/seance.webp"
                alt="Salle de traitement lumineuse et moderne du cabinet"
              />
              <span className="philosophy__accent" aria-hidden="true" />
            </figure>

            <div className="split__content reveal">
              <p className="eyebrow">Notre approche</p>
              <h2>
                Prendre soin de vos dents, c'est aussi prendre le temps de vous
                écouter.
              </h2>
              <p>
                Chaque rendez-vous commence par une écoute attentive. Nous
                prenons le temps de comprendre votre situation, d'expliquer les
                options possibles et de construire avec vous un plan de
                traitement qui vous ressemble — sans jargon, sans précipitation.
              </p>
              <p>
                Notre objectif : que vous veniez au cabinet en toute
                confiance, et que vous en repartiez sereinement.
              </p>
            </div>
          </div>
        </section>

        {/* ================= POURQUOI NOUS ================= */}
        <section className="section">
          <div className="container">
            <header className="section__head reveal reveal-stagger">
              <p className="eyebrow">Le cabinet</p>
              <h2>Une attention portée à chaque détail.</h2>
            </header>

            <div className="why reveal-stagger">
              {WHY.map((item, i) => (
                <div key={item.title} className="why__col">
                  <span className="why__marker" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= DOCTEUR ================= */}
        <section className="section section--doctor">
          <div className="container split split--doctor">
            <figure className="doctor__media reveal reveal--media">
              <img
                src="/images/dr-bekada.jpg"
                alt="Portrait professionnel du Dr. Bekada Med Oussama"
              />
            </figure>

            <div className="split__content reveal">
              <p className="eyebrow">Votre dentiste</p>
              <h2>Dr. Bekada Med Oussama</h2>
              <p className="doctor__role">Chirurgien-dentiste · Sidi Bel Abbès</p>
              <p>
                Reconnu pour son professionnalisme, sa précision et la qualité
                de son accompagnement, le Dr. Bekada prend en charge chaque
                patient avec écoute et douceur. Sa priorité : des soins
                indolores, expliqués clairement, dans un cabinet propre et
                bien organisé.
              </p>

              <ul className="doctor__info" role="list">
                {INFO.map((row) => (
                  <li key={row.label}>
                    <span>{row.label}</span>
                    <span>{row.value}</span>
                  </li>
                ))}
              </ul>

              <a {...waProps()} className="btn btn--primary">Prendre rendez-vous</a>
            </div>
          </div>
        </section>

        {/* ================= GALERIE ================= */}
        <section className="section">
          <div className="container">
            <header className="section__head reveal reveal-stagger">
              <p className="eyebrow">Le lieu</p>
              <h2>Un espace pensé pour votre confort.</h2>
            </header>

            <div className="gallery reveal-stagger">
              {GALLERY.map((img, i) => (
                <button
                  key={img.src}
                  className={`gallery__item ${img.big ? "gallery__item--big" : ""}`}
                  onClick={() => setLightbox(i)}
                  aria-label={`Agrandir l'image : ${img.alt}`}
                >
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {lightbox !== null && (
          <div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Image agrandie"
            onClick={() => setLightbox(null)}
          >
            <button className="lightbox__close" aria-label="Fermer">×</button>
            <img src={GALLERY[lightbox].src.replace("w=800", "w=1600").replace("w=1200", "w=1600")} alt={GALLERY[lightbox].alt} />
          </div>
        )}

        {/* ================= AVIS ================= */}
        <section className="section section--blue-soft" id="avis">
          <div className="container">
            <header className="section__head reveal reveal-stagger">
              <p className="eyebrow eyebrow--on-blue">Avis</p>
              <h2>L'expérience de nos patients</h2>
              <p className="section__intro">
                <strong>★ 4,8/5</strong> — la note moyenne du cabinet sur Google.
              </p>
            </header>

            <div className="reviews reveal-stagger">
              {REVIEWS.map((r) => (
                <blockquote key={r.name} className="review-card">
                  <p className="review-card__stars" aria-label="Note : 5 sur 5">★★★★★</p>
                  <p className="review-card__text">“{r.text}”</p>
                  <footer>— {r.name} · Google</footer>
                </blockquote>
              ))}
            </div>

            <p className="reviews__more reveal">
              <a
                href="https://www.google.com/maps/search/Dr+Bekada+Med+Oussama+dentiste+Sidi+Bel+Abb%C3%A8s"
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir tous les avis Google →
              </a>
            </p>
          </div>
        </section>

        {/* ================= RENDEZ-VOUS ================= */}
        <section className="section section--cta" id="rendez-vous">
          <div className="container split split--appointment">
            <div className="split__content reveal">
              <p className="eyebrow eyebrow--on-cta">Prendre rendez-vous</p>
              <h2>Prenez rendez-vous simplement.</h2>
              <p>
                Indiquez vos coordonnées et le motif de votre consultation. Le
                cabinet vous recontactera pour confirmer votre rendez-vous.
              </p>
              <p className="appointment__reassure">
                Ouvert 24h/24 · 7j/7 · Confirmation par téléphone
              </p>
            </div>

            <div className="appointment__form-wrap reveal">
              {sent ? (
                <div className="appointment__success" role="status">
                  <strong>Votre demande est prête dans WhatsApp.</strong>
                  <p>Envoyez le message pré-rempli pour que le cabinet puisse confirmer votre rendez-vous.</p>
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                    Ouvrir WhatsApp
                  </a>
                </div>
              ) : (
                <form
                  className="appointment__form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const f = new FormData(e.currentTarget);
                    const get = (k: string) => String(f.get(k) ?? "").trim();
                    const date = get("date").split("-").reverse().join("/");
                    const lines = [
                      "Bonjour, je souhaite prendre rendez-vous.",
                      `Nom : ${get("nom")}`,
                      `Téléphone : ${get("telephone")}`,
                      get("email") && `Email : ${get("email")}`,
                      `Motif : ${get("motif")}`,
                      date && `Date souhaitée : ${date}`,
                      get("message") && `Message : ${get("message")}`,
                    ].filter(Boolean);
                    const url = whatsappUrl(lines.join("\n"));
                    setWaLink(url);
                    window.open(url, "_blank", "noopener,noreferrer");
                    setSent(true);
                  }}
                >
                  <div className="field">
                    <label htmlFor="f-nom">Nom complet</label>
                    <input id="f-nom" name="nom" type="text" required autoComplete="name" placeholder="Votre nom" />
                  </div>
                  <div className="field">
                    <label htmlFor="f-tel">Téléphone</label>
                    <input id="f-tel" name="telephone" type="tel" required autoComplete="tel" placeholder="0780 30 89 63" />
                  </div>
                  <div className="field">
                    <label htmlFor="f-email">Email <span className="field__opt">(optionnel)</span></label>
                    <input id="f-email" name="email" type="email" autoComplete="email" placeholder="vous@exemple.com" />
                  </div>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="f-motif">Motif de consultation</label>
                      <select
                        id="f-motif"
                        name="motif"
                        required
                        value={motif}
                        onChange={(e) => setMotif(e.target.value)}
                      >
                        <option value="" disabled>Sélectionner…</option>
                        {SERVICES.map((s) => (
                          <option key={s.n} value={s.title}>{s.title}</option>
                        ))}
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="f-date">Date souhaitée</label>
                      <input id="f-date" name="date" type="date" required />
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="f-message">Message</label>
                    <textarea id="f-message" name="message" rows={4} placeholder="Précisez votre demande…" />
                  </div>
                  <button type="submit" className="btn btn--light">Envoyer ma demande sur WhatsApp</button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ================= LOCALISATION ================= */}
        <section className="section" id="contact">
          <div className="container split split--location">
            <div className="split__content reveal">
              <p className="eyebrow">Nous trouver</p>
              <h2>Retrouvez-nous au cabinet.</h2>

              <ul className="location__info" role="list">
                <li><span>Adresse</span>Boulevard Soummam, Sidi Bel Abbès 22002</li>
                <li><span>Téléphone</span><a href="tel:+213780308963">0780 30 89 63</a></li>
                <li><span>Horaires</span>Ouvert 24h/24 · 7j/7</li>
              </ul>

              <div className="location__cta">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Boulevard+Soummam+Sidi+Bel+Abb%C3%A8s+22002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  Voir l'itinéraire
                </a>
                <a href="tel:+213780308963" className="btn btn--secondary">Appeler le cabinet</a>
              </div>
            </div>

            <div className="location__map reveal">
              <iframe
                title="Carte d'accès au cabinet Dr. Bekada, Boulevard Soummam, Sidi Bel Abbès"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3260.6656294113814!2d-0.6322747892085601!3d35.18988557263618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7f010041345401%3A0x3212f442e302799f!2sDentist%20Dr.%20BEKADA%20Med%20Oussama!5e0!3m2!1sen!2sdz!4v1792269628647!5m2!1sen!2sdz"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        {/* ================= CTA FINALE =================  
        </iframe> 
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3260.6656294113814!2d-0.6322747892085601!3d35.18988557263618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7f010041345401%3A0x3212f442e302799f!2sDentist%20Dr.%20BEKADA%20Med%20Oussama!5e0!3m2!1sen!2sdz!4v1792269628647!5m2!1sen!2sdz" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin">*/}
        <section className="final-cta">
          <div className="container final-cta__inner reveal-stagger">
            <h2>Votre sourire mérite une attention particulière.</h2>
            <p>Prenez rendez-vous avec le Dr. Bekada Med Oussama.</p>
            <a {...waProps()} className="btn btn--primary">Prendre rendez-vous</a>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="container footer__grid">
          <div>
            <h3>Cabinet</h3>
            <p>Dr. Bekada Med Oussama<br />Chirurgien-dentiste</p>
          </div>
          <nav aria-label="Navigation de pied de page">
            <h3>Navigation</h3>
            {NAV.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </nav>
          <div>
            <h3>Contact</h3>
            <p>Boulevard Soummam, Sidi Bel Abbès 22002<br />
              <a href="tel:+213780308963">0780 30 89 63</a><br />
              Ouvert 24h/24 · 7j/7</p>
          </div>
        </div>
        <div className="container footer__bottom">
          <p>© 2026 Cabinet Dr. Bekada — Sidi Bel Abbès</p>
          <p><a href="#">Mentions légales</a> · <a href="#">Politique de confidentialité</a></p>
        </div>
      </footer>
    </>
  );
}