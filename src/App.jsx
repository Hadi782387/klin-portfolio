import { useState, useEffect, useRef, useCallback } from "react";
import "./index.css";
import { crew, about, projects, skills, rubric, contact, footer } from "./data/data";

const Avatar = ({ m, size = "" }) => (
  <div className={`avatar ${m.tone} ${size}`} aria-hidden="true">
    <div className="body"><i /><i /></div>
    <div className="head">
      <div className="hair" />
      <div className="face">
        <span className="eye l" /><span className="eye r" />
        <span className="cheek l" /><span className="cheek r" /><span className="mouth" />
      </div>
    </div>
    <div className="laptop"><em>{m.initial}</em></div>
    <div className="hand l" /><div className="hand r" />
  </div>
);

const Dot = ({ m }) => <span className={`dot ${m.tone}`} title={m.name}><span /></span>;

function Splash({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    const k = (e) => { if (["Enter", " ", "Escape"].includes(e.key)) { e.preventDefault(); onDone(); } };
    window.addEventListener("keydown", k);
    return () => { clearTimeout(t); window.removeEventListener("keydown", k); };
  }, [onDone]);
  return (
    <div className="splash" role="dialog" aria-label="Welcome to KILN">
      <div className="splash-k">K</div>
      <div className="splash-word" aria-hidden="true">
        {"KILN".split("").map((c, i) => <span key={i} style={{ animationDelay: `${0.5 + i * 0.12}s` }}>{c}</span>)}
      </div>
      <p>Three builders. Shaped in code.</p>
      <button className="skip" onClick={onDone} autoFocus>Skip (Enter)</button>
    </div>
  );
}

function Profile({ p, open }) {
  return (
    <div className="prof">
      {p.bio.map((t) => <p className="bio" key={t}>{t}</p>)}
      <div className="facts">{p.facts.map(([l, v]) => <div className="fact" key={l}><small>{l}</small><b>{v}</b></div>)}</div>
      {p.experience && (
        <div className="exp">
          <span className="exptag">{p.experience.tag}</span>
          <p className="eyebrow">Featured experience</p>
          <h3>{p.experience.org}</h3>
          <p className="desc">{p.experience.text}</p>
          {p.experience.project && <button className="link" onClick={() => open(p.experience.project)}>{p.experience.projectLabel} ↗</button>}
        </div>
      )}
      {p.growth && <div className="growth"><p className="eyebrow">Growth area</p><p>{p.growth}</p></div>}
      <p className="eyebrow gap">Selected work</p>
      {p.work.map(([t, s]) => <div className="wk" key={t}><b>{t}</b><span>{s}</span></div>)}
      {p.ratings ? (
        <>
          <p className="eyebrow gap">Skill ratings</p>
          {p.ratings.map((r) => (
            <div className="rate" key={r.name}>
              <div className="rt"><span>{r.name}</span><b>{r.score}/10</b></div>
              <div className="bar"><i style={{ width: `${r.score * 10}%` }} /></div>
              <div className="ev">{r.evidence.length ? <><small>Backed by resume</small>{r.evidence.map((e) => <span key={e} className="chip sm">{e}</span>)}</> : <small>Self-assessed</small>}</div>
            </div>
          ))}
        </>
      ) : (
        <>
          <p className="eyebrow gap">Skills</p>
          <div className="chips">{p.skills.map((s) => <span key={s} className="chip">{s}</span>)}</div>
        </>
      )}
      <div className="chips gap">{p.links.map((l) => l.url ? <a key={l.label} className="ghost" href={l.url}>{l.label}</a> : <span key={l.label} className="ghost">{l.label} · Coming soon</span>)}</div>
    </div>
  );
}

export default function App() {
  const [splash, setSplash] = useState(() => { try { return !sessionStorage.getItem("kiln-splash"); } catch { return true; } });
  const done = useCallback(() => { try { sessionStorage.setItem("kiln-splash", "1"); } catch {} setSplash(false); }, []);
  const [menu, setMenu] = useState(false);
  const [idx, setIdx] = useState(1);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errs, setErrs] = useState({});
  const [sent, setSent] = useState(false);
  const touch = useRef(0);
  const panelRef = useRef(null);
  const n = crew.length;
  const cur = crew[idx];
  const by = (id) => crew.find((c) => c.id === id);
  const off = (i) => { const d = (i - idx + n) % n; return d > n / 2 ? d - n : d; };
  const focusTo = (i) => { setIdx(i); setOpen(false); };
  const rot = (d) => focusTo((idx + d + n) % n);

  useEffect(() => {
    const k = (e) => { if (e.key === "Escape") { setModal(null); setMenu(false); } };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  useEffect(() => {
    if (open) panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [open, idx]);

  const go = (id) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const links = [["top", "Home"], ["about", "About"], ["crew", "Crew"], ["work", "Projects"], ["skills", "Skills"], ["contact", "Contact"]];

  const submit = (e) => {
    e.preventDefault();
    const x = {};
    if (!form.name.trim()) x.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) x.email = "Enter a valid email address.";
    if (form.message.trim().length < 10) x.message = "Write at least 10 characters.";
    setErrs(x);
    setSent(!Object.keys(x).length);
  };
  const field = (k, label, area) => (
    <div className="field">
      <label htmlFor={k}>{label}</label>
      {area
        ? <textarea id={k} rows="5" value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
        : <input id={k} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />}
      {errs[k] && <p className="err" role="alert">{errs[k]}</p>}
    </div>
  );

  return (
    <>
      {splash && <Splash onDone={done} />}
      <header className="navwrap">
        <div className="nav">
          <button className="logo" onClick={() => go("top")} aria-label="KILN home">K</button>
          <button className="pill" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? "Close" : "Menu"}</button>
        </div>
        {menu && (
          <nav className="menu" aria-label="Main">
            {links.map(([id, l]) => <button key={id} onClick={() => go(id)}>{l}</button>)}
          </nav>
        )}
      </header>

      <main id="top">
        <section className="hero">
          <p className="eyebrow">Student development team · Mumbai</p>
          <h1>KILN</h1>
          <h2>Three builders. Shaped in code.</h2>
          <p className="lead">A three-member student dev team that turns ideas into working software, from backend systems to friendly interfaces.</p>
          <button className="cta" onClick={() => go("crew")}>Meet the crew <span>↓</span></button>
          <div className="blob peach" /><div className="blob mint" />
          <div className="trio">
            {crew.map((m, i) => (
              <figure key={m.id} className={i === 1 ? "mid" : "side"}>
                <Avatar m={m} />
                <figcaption>{m.name}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="about" className="sec">
          <p className="eyebrow">About KILN</p>
          <h2 className="h">{about.title}</h2>
          <p className="muted">{about.intro}</p>
          <div className="card">
            <p className="eyebrow">Our mission</p><p className="big">{about.mission}</p>
            <p className="eyebrow gap">Our vibe</p><p className="big">{about.vibe}</p>
          </div>
          {about.values.map(([t, d], i) => (
            <div className="card val" key={t}><span className="num">0{i + 1}</span><h3>{t}</h3><p className="muted">{d}</p></div>
          ))}
        </section>

        <section id="crew" className="sec crewsec">
          <p className="eyebrow center">The people behind the work</p>
          <h2 className="h center">Meet the Crew</h2>
          <p className="muted center">Rotate the row, bring a builder into focus, then open their profile.</p>
          <div className="deck" tabIndex={0} aria-label="Crew carousel, use arrow keys"
            onKeyDown={(e) => { if (e.key === "ArrowLeft") rot(-1); if (e.key === "ArrowRight") rot(1); }}
            onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => { const d = e.changedTouches[0].clientX - touch.current; if (Math.abs(d) > 40) rot(d < 0 ? 1 : -1); }}>
            {crew.map((m, i) => {
              const o = off(i);
              return (
                <div key={m.id} className={`ccard ${m.tone} ${o === 0 ? "focus" : ""}`} style={{ "--o": o }}
                  onClick={() => o !== 0 && focusTo(i)} aria-hidden={o !== 0}>
                  <Avatar m={m} size="lg" />
                  <p className="eyebrow tone">{m.profile ? "Profile ready" : "Profile coming soon"}</p>
                  <h3 className="name">{m.name}</h3>
                  <p className="muted">{m.role}</p>
                  <button className={`cta ${m.tone}`} tabIndex={o === 0 ? 0 : -1}
                    onClick={(e) => { e.stopPropagation(); if (o === 0) setOpen(!open); }}>View profile</button>
                </div>
              );
            })}
          </div>
          <div className="arrows">
            <button aria-label="Previous builder" onClick={() => rot(-1)}>←</button>
            <button aria-label="Next builder" onClick={() => rot(1)}>→</button>
          </div>
          {open && (
            <div ref={panelRef} className={`card panel ${cur.tone}`}>
              <div className="row"><Dot m={cur} /><div><p className="eyebrow tone">{cur.toneName} crew member</p><h3 className="name">{cur.name}</h3><p className="muted">{cur.profile ? cur.profile.role : "Profile details coming soon"}</p></div></div>
              <button className="close" onClick={() => setOpen(false)}>Close profile</button>
              <hr />
              {cur.profile ? (
                <Profile p={cur.profile} open={(id) => setModal(projects.find((x) => x.id === id))} />
              ) : (
                <div className="center"><span className="badge">Sample</span><h3>Profile in progress</h3>
                  <p className="muted">{cur.name}'s role, story, skills and links will appear here after their resume and details are shared. Nothing has been invented.</p>
                  <span className="ghost">Coming soon</span></div>
              )}
            </div>
          )}
        </section>

        <section id="work" className="sec">
          <p className="eyebrow">Selected work</p>
          <h2 className="h">Things we have built</h2>
          <p className="muted">Four projects across applied AI, backend systems and full-stack product work.</p>
          {projects.map((p) => (
            <article className="card proj" key={p.id}>
              <div className={`art ${p.tone}`}><span className={`tile ${p.tone}`}>{p.code}</span><i className="b1" /><i className="b2" /><i className="b3" /></div>
              <div className="pbody">
                <div className="row between"><span className="badge">{p.status}</span><span className="stack">{p.owners.map((o) => <Dot key={o} m={by(o)} />)}</span></div>
                <h3 className="ptitle">{p.title}</h3><p className="muted">{p.sub}</p>
                <p className="desc">{p.desc}</p>
                <div className="chips">{p.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
                <button className="link" onClick={() => setModal(p)}>View project →</button>
              </div>
            </article>
          ))}
        </section>

        <section id="skills" className="sec">
          <p className="eyebrow">Skills with evidence</p>
          <h2 className="h">Our toolbox</h2>
          <p className="muted">A practical toolkit built through projects, not a wall of logos.</p>
          <div className="filters">
            <button className={`fbtn ${filter === "all" ? "on" : ""}`} onClick={() => setFilter("all")}>All skills</button>
            {["vedant", "sahil", "yasin"].map(by).map((m) => (
              <button key={m.id} className={`fbtn ${filter === m.id ? "on" : ""}`} onClick={() => setFilter(m.id)}><Dot m={m} />{m.name}</button>
            ))}
          </div>
          {skills.map((g) => {
            const items = g.items.filter(([, w]) => filter === "all" || w.includes(filter));
            if (!items.length) return null;
            return (<div className="card" key={g.group}><h3>{g.group}</h3><div className="chips">{items.map(([s]) => <span className="chip dotted" key={s}>{s}</span>)}</div></div>);
          })}
          <div className="card rubric">
            <p className="eyebrow">How we rate</p><h3>Honest numbers, visible proof.</h3>
            {rubric.map(([r, l]) => <p key={r} className="rr"><b>{r}</b>{l}</p>)}
            <p className="small">When unsure, pick the lower number.</p>
          </div>
        </section>

        <section id="contact" className="sec">
          <p className="eyebrow">{contact.eyebrow}</p>
          <h2 className="h">{contact.title}</h2>
          <p className="muted">{contact.lead}</p>
          <div className="card form">
            <p className="eyebrow">{contact.cardEyebrow}</p>
            <h3 className="ctitle">{contact.cardTitle}</h3>
            <p className="muted">{contact.note}</p>
            <div className="chips">{contact.links.map((l) => <span key={l} className="ghost">{l} · Coming soon</span>)}</div>
            {sent ? <p className="ok" role="status">Message drafted. Thanks, {form.name}. Keep a copy for now, sending goes live once team links are ready.</p> : (
              <form onSubmit={submit} noValidate>
                {field("name", "Name")}{field("email", "Email")}{field("message", "Message", true)}
                <button className="cta" type="submit">Send message →</button>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer><b>KILN</b><p>Three builders. Shaped in code.</p><p>{footer}</p></footer>

      {modal && (
        <div className="overlay" onClick={() => setModal(null)}>
          <div className="card modal" role="dialog" aria-modal="true" aria-label={modal.title} onClick={(e) => e.stopPropagation()}>
            <span className={`tile ${modal.tone}`}>{modal.code}</span>
            <div><span className="badge">{modal.status}</span></div>
            <h3 className="ptitle">{modal.title}</h3><p className="muted">{modal.sub}</p>
            <p className="desc">{modal.desc}</p>
            <div className="chips">{modal.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
            <p className="muted">Built by {modal.owners.map((o) => by(o).name).join(", ")}.</p>
            <p className="muted">{modal.link ? <a href={modal.link}>Open project</a> : "Project link coming soon."}</p>
            <button className="close" onClick={() => setModal(null)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}