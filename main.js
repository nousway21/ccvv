// language switch
function setLang(l){
  document.documentElement.lang = l;
  document.querySelectorAll("[data-t]").forEach(e => { e.textContent = T[l][e.dataset.t]; });
  document.querySelectorAll(".lang button").forEach(b => b.setAttribute("aria-pressed", b.dataset.l === l));
  try { localStorage.setItem("lang", l); } catch (e) {}
}
let saved = "uz";
try { saved = localStorage.getItem("lang") || saved; } catch (e) {}
if (!T[saved]) saved = "uz";
document.querySelectorAll(".lang button").forEach(b => b.addEventListener("click", () => setLang(b.dataset.l)));
setLang(saved);

// scroll reveal + skill lines
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add("in");
    en.target.querySelectorAll(".bar b").forEach(b => { b.style.width = b.dataset.w + "%"; });
    io.unobserve(en.target);
  });
}, { threshold: .12 });
document.querySelectorAll(".reveal").forEach(s => io.observe(s));

// typing effect
const words = ["Cyber Security", "Web Development", "Python", "Linux", "Networking"];
const out = document.getElementById("typed");
let w = 0, c = 0, del = false;
function type(){
  const word = words[w];
  out.textContent = word.slice(0, c);
  if (!del && c === word.length) { del = true; return setTimeout(type, 1400); }
  if (del && c === 0) { del = false; w = (w + 1) % words.length; }
  c += del ? -1 : 1;
  setTimeout(type, del ? 45 : 90);
}
type();
