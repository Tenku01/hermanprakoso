import os
import re
import subprocess
import shutil

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)

# ---------------------------------------------------------------------------
# ATS HTML TEMPLATES (Pure single-column, standard fonts, 100% text, no icons, no tables)
# ---------------------------------------------------------------------------

CSS_ATS = """
@page {
  size: A4 portrait;
  margin: 0.6in 0.65in 0.6in 0.65in;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  color: #000000;
  background-color: #ffffff;
  font-size: 10pt;
  line-height: 1.35;
}

/* Header */
.cv-header {
  text-align: center;
  margin-bottom: 12pt;
}

.cv-name {
  font-size: 20pt;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5pt;
  margin-bottom: 3pt;
  color: #000000;
}

.cv-title {
  font-size: 11pt;
  font-weight: bold;
  font-style: italic;
  margin-bottom: 4pt;
  color: #000000;
}

.cv-contact {
  font-size: 9.5pt;
  line-height: 1.4;
  color: #000000;
}

.cv-contact a {
  color: #000000;
  text-decoration: none;
}

/* Section */
.section {
  margin-top: 10pt;
  margin-bottom: 4pt;
}

.section-title {
  font-size: 11pt;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5pt;
  border-bottom: 1pt solid #000000;
  padding-bottom: 2pt;
  margin-bottom: 6pt;
  color: #000000;
  break-after: avoid;
  page-break-after: avoid;
}

.page-break {
  break-before: page;
  page-break-before: always;
}

.summary-p {
  font-size: 9.5pt;
  line-height: 1.4;
  text-align: justify;
  margin-bottom: 4pt;
}

/* Item block */
.item-block {
  margin-bottom: 8pt;
  break-inside: avoid;
  page-break-inside: avoid;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 10pt;
  margin-bottom: 1pt;
}

.item-title-left {
  font-weight: bold;
}

.item-title-right {
  font-weight: normal;
  font-style: italic;
  font-size: 9.5pt;
  white-space: nowrap;
}

.item-sub-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 9.5pt;
  font-style: italic;
  margin-bottom: 3pt;
}

.item-sub-left {
  font-style: italic;
}

.item-sub-right {
  font-style: italic;
}

/* Bullets */
ul.bullet-list {
  margin-left: 18pt;
  padding-left: 0;
  margin-top: 2pt;
  margin-bottom: 4pt;
}

ul.bullet-list li {
  font-size: 9.5pt;
  line-height: 1.35;
  margin-bottom: 2.5pt;
  text-align: justify;
}

/* Skills list */
ul.skills-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

ul.skills-list li {
  font-size: 9.5pt;
  line-height: 1.4;
  margin-bottom: 3pt;
}

ul.skills-list li strong {
  font-weight: bold;
}
"""

def generate_indonesian_html():
    return f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>CV Herman Prakoso - ATS Friendly</title>
  <style>
    {CSS_ATS}
  </style>
</head>
<body>

  <!-- HEADER -->
  <div class="cv-header">
    <div class="cv-name">Herman Prakoso</div>
    <div class="cv-title">System Analyst | UI/UX Designer | Fullstack Web Developer</div>
    <div class="cv-contact">
      Temanggung, Jawa Tengah, Indonesia &bull; +62 896-7364-7187 &bull; herman.prakoso33@gmail.com<br>
      Portofolio: <a href="https://hermanprakoso.vercel.app">hermanprakoso.vercel.app</a> &bull; GitHub: <a href="https://github.com/Tenku01">github.com/Tenku01</a>
    </div>
  </div>

  <!-- RINGKASAN PROFESIONAL -->
  <div class="section">
    <div class="section-title">Ringkasan Profesional</div>
    <p class="summary-p">
      Lulusan S1 Sistem Informasi Universitas Teknologi Yogyakarta (IPK 3.92/4.00) dengan keahlian menyeluruh dalam System Analysis, UI/UX Design, dan Fullstack Web Programming. Berpengalaman merancang arsitektur basis data relasional MySQL, menyusun dokumentasi teknis komprehensif (SRS & SDD), membuat prototipe interaktif dan design system di Figma, serta membangun aplikasi web berbasis Laravel dan Tailwind CSS. Terbiasa mengelola siklus rekayasa perangkat lunak dari analisis kebutuhan pengguna, pemodelan sistem bisnis, implementasi kode, hingga functional testing.
    </p>
  </div>

  <!-- PENGALAMAN KERJA -->
  <div class="section">
    <div class="section-title">Pengalaman Kerja</div>

    <!-- Role 1 -->
    <div class="item-block">
      <div class="item-header">
        <span class="item-title-left">PT AKA Mendunia Sejahtera</span>
        <span class="item-title-right">Februari 2026 &ndash; Juni 2026</span>
      </div>
      <div class="item-sub-header">
        <span class="item-sub-left">Programmer &amp; System Analyst</span>
        <span class="item-sub-right">Temanggung, Indonesia</span>
      </div>
      <ul class="bullet-list">
        <li>Menganalisis kebutuhan bisnis dan pengguna untuk perancangan sistem informasi reservasi rental mobil berbasis web.</li>
        <li>Merancang alur sistem (flowchart, DFD), entity relationship diagram (ERD), dan prototipe antarmuka di Figma.</li>
        <li>Mengembangkan aplikasi web menggunakan Laravel dan MySQL dengan penerapan hak akses berbasis peran (role-based access control) untuk 5 role pengguna.</li>
        <li>Mengintegrasikan payment gateway digital untuk mendukung otomatisasi proses verifikasi pembayaran secara real-time.</li>
        <li>Mengimplementasikan fitur live chat secara real-time menggunakan WebSocket (Laravel Reverb) untuk komunikasi pelanggan dan admin.</li>
        <li>Menyusun dokumentasi teknis sistem (SRS & SDD) serta melakukan functional testing untuk memastikan keandalan alur transaksi.</li>
      </ul>
    </div>

    <!-- Role 2 -->
    <div class="item-block">
      <div class="item-header">
        <span class="item-title-left">PT Swevel Universal Media</span>
        <span class="item-title-right">September 2025 &ndash; Januari 2026</span>
      </div>
      <div class="item-sub-header">
        <span class="item-sub-left">UI/UX Designer &amp; System Analyst Intern</span>
        <span class="item-sub-right">Yogyakarta, Indonesia</span>
      </div>
      <ul class="bullet-list">
        <li>Merancang antarmuka website dan aplikasi mobile di Figma dengan fokus pada prinsip usability, visual hierarchy, dan aksesibilitas.</li>
        <li>Menyusun user flow, wireframe, interactive prototype, dan high-fidelity design sebagai acuan implementasi tim pengembang.</li>
        <li>Menyusun dokumentasi spesifikasi kebutuhan sistem mencakup Software Requirements Specification (SRS), SDD, dan Manual Book.</li>
        <li>Berkolaborasi dengan software engineer untuk mengevaluasi kelayakan teknis dan memastikan akurasi implementasi desain antarmuka.</li>
        <li>Menjalankan pengujian usability dan iterasi desain berkala berdasarkan umpan balik pengguna.</li>
      </ul>
    </div>

    <!-- Role 3 -->
    <div class="item-block">
      <div class="item-header">
        <span class="item-title-left">PT Gama Integra Informatika</span>
        <span class="item-title-right">Januari 2025 &ndash; Juni 2025</span>
      </div>
      <div class="item-sub-header">
        <span class="item-sub-left">UI/UX Designer &amp; System Analyst Intern</span>
        <span class="item-sub-right">Yogyakarta, Indonesia</span>
      </div>
      <ul class="bullet-list">
        <li>Merancang antarmuka produk digital berbasis web dan mobile mengadopsi prinsip User-Centered Design (UCD).</li>
        <li>Membangun wireframe, prototipe interaktif, dan panduan komponen antarmuka (design system) untuk konsistensi visual.</li>
        <li>Melakukan wawancara stakeholder dan riset pengguna untuk mengidentifikasi kebutuhan fungsional sistem informasi.</li>
        <li>Melakukan evaluasi usability berkelanjutan untuk meningkatkan kenyamanan dan efisiensi alur pengguna.</li>
      </ul>
    </div>

  </div>

  <!-- PENDIDIKAN -->
  <div class="section page-break">
    <div class="section-title">Pendidikan</div>

    <div class="item-block">
      <div class="item-header">
        <span class="item-title-left">Universitas Teknologi Yogyakarta</span>
        <span class="item-title-right">Lulusan 2026</span>
      </div>
      <div class="item-sub-header">
        <span class="item-sub-left">S1 Sistem Informasi | IPK: 3.92 / 4.00 (Cum Laude)</span>
        <span class="item-sub-right">Yogyakarta, Indonesia</span>
      </div>
      <ul class="bullet-list">
        <li><strong>Skripsi:</strong> Sistem Informasi Rental Mobil Berbasis Website - PT AKA Mendunia (Perancangan arsitektur sistem informasi web multi-role, payment gateway, dan real-time WebSocket live chat).</li>
      </ul>
    </div>

    <div class="item-block">
      <div class="item-header">
        <span class="item-title-left">SMA Negeri 2 Temanggung</span>
        <span class="item-title-right">Lulusan 2022</span>
      </div>
      <div class="item-sub-header">
        <span class="item-sub-left">Matematika dan Ilmu Pengetahuan Alam (MIPA)</span>
        <span class="item-sub-right">Temanggung, Indonesia</span>
      </div>
    </div>

  </div>

  <!-- PENCAPAIAN & PENGHARGAAN -->
  <div class="section">
    <div class="section-title">Pencapaian &amp; Penghargaan</div>

    <div class="item-block">
      <div class="item-header">
        <span class="item-title-left">Juara 1 Lomba UI/UX Design Tingkat Universitas &ndash; Proyek LIFE+ SuperApp</span>
        <span class="item-title-right">2025</span>
      </div>
      <ul class="bullet-list">
        <li>Memimpin riset pengguna melalui wawancara dan kuesioner, merancang arsitektur informasi, serta membangun prototipe interaktif aplikasi mobile kesehatan.</li>
      </ul>
    </div>

  </div>

  <!-- PROYEK TERPILIH -->
  <div class="section">
    <div class="section-title">Proyek Portofolio Terpilih</div>

    <div class="item-block">
      <div class="item-header">
        <span class="item-title-left">Sistem Informasi Rental Mobil Berbasis Web (PT AKA Mendunia)</span>
        <span class="item-title-right">2026</span>
      </div>
      <div class="item-sub-header">
        <span class="item-sub-left">Teknologi: Laravel, PHP, MySQL, WebSocket (Laravel Reverb), Tailwind CSS, Midtrans, Figma</span>
      </div>
      <ul class="bullet-list">
        <li>Mengembangkan sistem reservasi armada rental mobil terintegrasi dengan 5 role akses pengguna, manajemen transaksi, pembayaran digital, dan live chat real-time.</li>
      </ul>
    </div>

    <div class="item-block">
      <div class="item-header">
        <span class="item-title-left">LIFE+ Health SuperApp</span>
        <span class="item-title-right">2025</span>
      </div>
      <div class="item-sub-header">
        <span class="item-sub-left">Teknologi: Figma, User Research, Information Architecture, Interactive Prototyping</span>
      </div>
      <ul class="bullet-list">
        <li>Merancang konsep antarmuka mobile superApp kesehatan yang mengintegrasikan monitoring gaya hidup sehat dan booking layanan medis (Juara 1 Lomba UI/UX).</li>
      </ul>
    </div>

    <div class="item-block">
      <div class="item-header">
        <span class="item-title-left">Platform Monitoring Tender (tenderplus.id)</span>
        <span class="item-title-right">2025</span>
      </div>
      <div class="item-sub-header">
        <span class="item-sub-left">Teknologi: Figma, UI/UX Design, Information Architecture, Data Visualization</span>
      </div>
      <ul class="bullet-list">
        <li>Merancang dashboard monitoring tahapan pengadaan tender barang dan jasa pemerintah untuk mempermudah vendor mengakses informasi secara terstruktur.</li>
      </ul>
    </div>

    <div class="item-block">
      <div class="item-header">
        <span class="item-title-left">Sistem Informasi Pemetaan Ruang Terbuka Hijau Publik (RTHP) Kota Yogyakarta</span>
        <span class="item-title-right">2025</span>
      </div>
      <div class="item-sub-header">
        <span class="item-sub-left">Teknologi: Figma, GIS Interface Design, Spatial Data Navigation</span>
      </div>
      <ul class="bullet-list">
        <li>Merancang antarmuka sistem informasi inventarisasi dan pemetaan spasial RTHP berbasis GIS untuk pemantauan tata ruang perkotaan.</li>
      </ul>
    </div>

    <div class="item-block">
      <div class="item-header">
        <span class="item-title-left">Sistem Pengelolaan Arsip dan Progress Riset (Pusjianstralitbang)</span>
        <span class="item-title-right">2025</span>
      </div>
      <div class="item-sub-header">
        <span class="item-sub-left">Teknologi: Figma, System Analysis, Workflow Modeling</span>
      </div>
      <ul class="bullet-list">
        <li>Merancang antarmuka sistem web tata kelola pengarsipan dokumen dan pelacakan perkembangan penelitian lintas departemen.</li>
      </ul>
    </div>

  </div>

  <!-- KEAHLIAN TEKNIS -->
  <div class="section">
    <div class="section-title">Keahlian Teknis</div>

    <ul class="skills-list">
      <li><strong>Analisis Sistem &amp; Rekayasa:</strong> System Analysis, Software Requirements Specification (SRS), Software Design Description (SDD), Flowchart, Data Flow Diagram (DFD), Entity Relationship Diagram (ERD), Use Case Modeling, Business Process Modeling, Functional Testing.</li>
      <li><strong>UI/UX Design &amp; Riset:</strong> User Research, User Flow, Wireframing, Interactive Prototyping, High-Fidelity UI Design, Design Systems, Usability Testing, Heuristic Evaluation, User-Centered Design (UCD).</li>
      <li><strong>Pemrograman &amp; Web:</strong> PHP, JavaScript, TypeScript, HTML5, CSS3, Tailwind CSS, Next.js, Laravel Framework, RESTful API.</li>
      <li><strong>Basis Data &amp; Real-Time:</strong> MySQL, Relational Database Modeling, WebSocket, Laravel Reverb.</li>
      <li><strong>Tools &amp; Lingkungan Kerja:</strong> Figma, Visual Studio Code, Git, GitHub, Draw.io, Postman.</li>
      <li><strong>Soft Skills:</strong> Problem Solving, Critical Thinking, Cross-Functional Teamwork, Communication, Adaptability.</li>
    </ul>

  </div>

</body>
</html>
"""

def generate_english_html():
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CV Herman Prakoso - ATS Friendly</title>
  <style>
    {CSS_ATS}
  </style>
</head>
<body>

  <!-- HEADER -->
  <div class="cv-header">
    <div class="cv-name">Herman Prakoso</div>
    <div class="cv-title">System Analyst | UI/UX Designer | Fullstack Web Developer</div>
    <div class="cv-contact">
      Temanggung, Central Java, Indonesia &bull; +62 896-7364-7187 &bull; herman.prakoso33@gmail.com<br>
      Portfolio: <a href="https://hermanprakoso.vercel.app">hermanprakoso.vercel.app</a> &bull; GitHub: <a href="https://github.com/Tenku01">github.com/Tenku01</a>
    </div>
  </div>

  <!-- PROFESSIONAL SUMMARY -->
  <div class="section">
    <div class="section-title">Professional Summary</div>
    <p class="summary-p">
      Information Systems graduate from Universitas Teknologi Yogyakarta (GPA 3.92/4.00) with end-to-end expertise in System Analysis, UI/UX Design, and Fullstack Web Development. Experienced in designing relational MySQL database architectures, authoring comprehensive technical documentation (SRS & SDD), engineering interactive prototypes and design systems in Figma, and developing web applications using Laravel and Tailwind CSS. Proven ability to translate user requirements into functional web systems from initial analysis to implementation and functional testing.
    </p>
  </div>

  <!-- WORK EXPERIENCE -->
  <div class="section">
    <div class="section-title">Work Experience</div>

    <!-- Role 1 -->
    <div class="item-block">
      <div class="item-header">
        <span class="item-title-left">PT AKA Mendunia Sejahtera</span>
        <span class="item-title-right">February 2026 &ndash; June 2026</span>
      </div>
      <div class="item-sub-header">
        <span class="item-sub-left">Programmer &amp; System Analyst</span>
        <span class="item-sub-right">Temanggung, Indonesia</span>
      </div>
      <ul class="bullet-list">
        <li>Analyzed business workflows and user requirements to design a web-based car rental reservation system.</li>
        <li>Engineered system workflows (flowcharts, DFD), entity relationship diagrams (ERD), and interface prototypes in Figma.</li>
        <li>Developed web application using Laravel and MySQL with role-based access control across 5 distinct user privilege tiers.</li>
        <li>Integrated digital payment gateway to automate real-time transaction verification and billing workflows.</li>
        <li>Implemented real-time interactive messaging using WebSockets (Laravel Reverb) between customers and administrators.</li>
        <li>Authored Software Requirements Specifications (SRS), SDD, and conducted functional testing to ensure system stability.</li>
      </ul>
    </div>

    <!-- Role 2 -->
    <div class="item-block">
      <div class="item-header">
        <span class="item-title-left">PT Swevel Universal Media</span>
        <span class="item-title-right">September 2025 &ndash; January 2026</span>
      </div>
      <div class="item-sub-header">
        <span class="item-sub-left">UI/UX Designer &amp; System Analyst Intern</span>
        <span class="item-sub-right">Yogyakarta, Indonesia</span>
      </div>
      <ul class="bullet-list">
        <li>Designed responsive web and mobile interfaces in Figma focusing on usability heuristics, visual hierarchy, and accessibility.</li>
        <li>Produced comprehensive user flows, wireframes, interactive prototypes, and high-fidelity design specifications for development teams.</li>
        <li>Authored technical system documentation including Software Requirements Specifications (SRS), SDD, and User Manuals.</li>
        <li>Collaborated with software engineers to evaluate technical feasibility and maintain high visual fidelity during implementation.</li>
        <li>Executed usability evaluations and iterated interfaces based on user testing findings and qualitative feedback.</li>
      </ul>
    </div>

    <!-- Role 3 -->
    <div class="item-block">
      <div class="item-header">
        <span class="item-title-left">PT Gama Integra Informatika</span>
        <span class="item-title-right">January 2025 &ndash; June 2025</span>
      </div>
      <div class="item-sub-header">
        <span class="item-sub-left">UI/UX Designer &amp; System Analyst Intern</span>
        <span class="item-sub-right">Yogyakarta, Indonesia</span>
      </div>
      <ul class="bullet-list">
        <li>Designed web and mobile interfaces adhering to User-Centered Design (UCD) methodologies.</li>
        <li>Built wireframes, interactive prototypes, and reusable design system component libraries to support engineering velocity.</li>
        <li>Conducted stakeholder interviews and user research to identify core functional requirements for information systems.</li>
        <li>Performed ongoing usability reviews to optimize user flow efficiency and user satisfaction.</li>
      </ul>
    </div>

  </div>

  <!-- EDUCATION -->
  <div class="section page-break">
    <div class="section-title">Education</div>

    <div class="item-block">
      <div class="item-header">
        <span class="item-title-left">Universitas Teknologi Yogyakarta</span>
        <span class="item-title-right">Graduated 2026</span>
      </div>
      <div class="item-sub-header">
        <span class="item-sub-left">Bachelor of Information Systems | GPA: 3.92 / 4.00 (Cum Laude)</span>
        <span class="item-sub-right">Yogyakarta, Indonesia</span>
      </div>
      <ul class="bullet-list">
        <li><strong>Thesis:</strong> Web-Based Car Rental Information System - PT AKA Mendunia (Multi-role web architecture, payment gateway integration, and real-time WebSocket live chat).</li>
      </ul>
    </div>

    <div class="item-block">
      <div class="item-header">
        <span class="item-title-left">SMA Negeri 2 Temanggung</span>
        <span class="item-title-right">Graduated 2022</span>
      </div>
      <div class="item-sub-header">
        <span class="item-sub-left">Natural Sciences (MIPA)</span>
        <span class="item-sub-right">Temanggung, Indonesia</span>
      </div>
    </div>

  </div>

  <!-- HONORS & AWARDS -->
  <div class="section">
    <div class="section-title">Honors &amp; Awards</div>

    <div class="item-block">
      <div class="item-header">
        <span class="item-title-left">1st Place Winner &ndash; University UI/UX Design Competition (LIFE+ SuperApp)</span>
        <span class="item-title-right">2025</span>
      </div>
      <ul class="bullet-list">
        <li>Led user research via in-depth interviews and qualitative questionnaires, established information architecture, and built interactive mobile health prototypes.</li>
      </ul>
    </div>

  </div>

  <!-- FEATURED PROJECTS -->
  <div class="section">
    <div class="section-title">Key Projects</div>

    <div class="item-block">
      <div class="item-header">
        <span class="item-title-left">Car Rental Reservation Web System (PT AKA Mendunia)</span>
        <span class="item-title-right">2026</span>
      </div>
      <div class="item-sub-header">
        <span class="item-sub-left">Tech Stack: Laravel, PHP, MySQL, WebSocket (Laravel Reverb), Tailwind CSS, Midtrans, Figma</span>
      </div>
      <ul class="bullet-list">
        <li>Engineered integrated car rental reservation platform supporting 5 user privilege roles, fleet management, digital payment automation, and real-time live chat.</li>
      </ul>
    </div>

    <div class="item-block">
      <div class="item-header">
        <span class="item-title-left">LIFE+ Health SuperApp</span>
        <span class="item-title-right">2025</span>
      </div>
      <div class="item-sub-header">
        <span class="item-sub-left">Tech Stack: Figma, UX Research, Information Architecture, Interactive Prototyping</span>
      </div>
      <ul class="bullet-list">
        <li>Designed comprehensive mobile superApp interface integrating wellness habit tracking and clinical service booking (1st Place Winner in UI/UX Competition).</li>
      </ul>
    </div>

    <div class="item-block">
      <div class="item-header">
        <span class="item-title-left">Tender Monitoring Platform (tenderplus.id)</span>
        <span class="item-title-right">2025</span>
      </div>
      <div class="item-sub-header">
        <span class="item-sub-left">Tech Stack: Figma, UI/UX Design, Information Architecture, Data Visualization</span>
      </div>
      <ul class="bullet-list">
        <li>Designed government procurement tender monitoring dashboard for vendors to review bidding stages and spatial analytics efficiently.</li>
      </ul>
    </div>

    <div class="item-block">
      <div class="item-header">
        <span class="item-title-left">Public Green Open Space (RTHP) GIS Mapping Portal</span>
        <span class="item-title-right">2025</span>
      </div>
      <div class="item-sub-header">
        <span class="item-sub-left">Tech Stack: Figma, GIS Interface Design, Spatial Data Navigation</span>
      </div>
      <ul class="bullet-list">
        <li>Designed spatial GIS mapping and public green open space inventory interface for municipal urban planning monitoring.</li>
      </ul>
    </div>

    <div class="item-block">
      <div class="item-header">
        <span class="item-title-left">Archive &amp; Research Progress Tracking System (Pusjianstralitbang)</span>
        <span class="item-title-right">2025</span>
      </div>
      <div class="item-sub-header">
        <span class="item-sub-left">Tech Stack: Figma, System Analysis, Workflow Modeling</span>
      </div>
      <ul class="bullet-list">
        <li>Architected web-based system interface for centralized research document archiving and milestone progress monitoring across departments.</li>
      </ul>
    </div>

  </div>

  <!-- TECHNICAL SKILLS -->
  <div class="section">
    <div class="section-title">Technical Skills</div>

    <ul class="skills-list">
      <li><strong>System Analysis &amp; Architecture:</strong> System Analysis, Software Requirements Specification (SRS), Software Design Description (SDD), Flowchart, Data Flow Diagram (DFD), Entity Relationship Diagram (ERD), Use Case Modeling, Business Process Modeling, Functional Testing.</li>
      <li><strong>UI/UX Design &amp; Research:</strong> User Research, User Flow, Wireframing, Interactive Prototyping, High-Fidelity UI Design, Design Systems, Usability Testing, Heuristic Evaluation, User-Centered Design (UCD).</li>
      <li><strong>Web Development &amp; Stack:</strong> PHP, JavaScript, TypeScript, HTML5, CSS3, Tailwind CSS, Next.js, Laravel Framework, RESTful API.</li>
      <li><strong>Database &amp; Real-Time:</strong> MySQL, Relational Database Modeling, WebSocket, Laravel Reverb.</li>
      <li><strong>Tools &amp; Workflow:</strong> Figma, Visual Studio Code, Git, GitHub, Draw.io, Postman.</li>
      <li><strong>Soft Skills:</strong> Problem Solving, Critical Thinking, Cross-Functional Teamwork, Communication, Adaptability.</li>
    </ul>

  </div>

</body>
</html>
"""

# ---------------------------------------------------------------------------
# OVERLEAF LATEX SOURCE CODE TEMPLATES
# ---------------------------------------------------------------------------

LATEX_IND = r"""\documentclass[letterpaper,10pt]{article}

% ── Packages ──────────────────────────────────────────────────────────────────
\usepackage[left=0.6in, right=0.6in, top=0.6in, bottom=0.6in]{geometry}
\usepackage{lmodern}
\usepackage[T1]{fontenc}
\usepackage[utf8]{inputenc}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{titlesec}
\usepackage{parskip}

% ── Hyperlink colours (black = ATS safe) ──────────────────────────────────────
\hypersetup{
    colorlinks=true,
    linkcolor=black,
    urlcolor=black,
    citecolor=black
}

% ── Section formatting ────────────────────────────────────────────────────────
\titleformat{\section}
  {\large\bfseries\uppercase}
  {}{0em}{}
  [\titlerule]
\titlespacing{\section}{0pt}{8pt}{4pt}

% ── List spacing ──────────────────────────────────────────────────────────────
\setlist[itemize]{
  leftmargin=1.5em,
  itemsep=2pt,
  parsep=0pt,
  topsep=2pt
}

% ── No page numbers ───────────────────────────────────────────────────────────
\pagestyle{empty}

\begin{document}

% ── HEADER ────────────────────────────────────────────────────────────────────
\begin{center}
  {\LARGE \textbf{HERMAN PRAKOSO}} \\[4pt]
  \textit{System Analyst} \textbf{|} \textit{UI/UX Designer} \textbf{|} \textit{Fullstack Web Developer} \\[4pt]
  Temanggung, Jawa Tengah, Indonesia $\bullet$ +62 896-7364-7187 $\bullet$ \href{mailto:herman.prakoso33@gmail.com}{herman.prakoso33@gmail.com} \\
  Portofolio: \href{https://hermanprakoso.vercel.app}{hermanprakoso.vercel.app} $\bullet$ GitHub: \href{https://github.com/Tenku01}{github.com/Tenku01}
\end{center}

\vspace{2pt}

% ── RINGKASAN PROFESIONAL ──────────────────────────────────────────────────────
\section{Ringkasan Profesional}

Lulusan S1 Sistem Informasi Universitas Teknologi Yogyakarta (IPK 3.92/4.00) dengan keahlian menyeluruh dalam System Analysis, UI/UX Design, dan Fullstack Web Programming. Berpengalaman merancang arsitektur basis data relasional MySQL, menyusun dokumentasi teknis komprehensif (SRS \& SDD), membuat prototipe interaktif dan design system di Figma, serta membangun aplikasi web berbasis Laravel dan Tailwind CSS. Terbiasa mengelola siklus rekayasa perangkat lunak dari analisis kebutuhan pengguna, pemodelan sistem bisnis, implementasi kode, hingga functional testing.

% ── PENGALAMAN KERJA ───────────────────────────────────────────────────────────
\section{Pengalaman Kerja}

\noindent
\textbf{Programmer \& System Analyst} \textbf{|} PT AKA Mendunia Sejahtera \textbf{|} \textit{Temanggung, Indonesia} \textbf{|} \textit{Feb 2026 -- Jun 2026}
\begin{itemize}
  \item Menganalisis kebutuhan bisnis dan pengguna untuk perancangan sistem informasi reservasi rental mobil berbasis web.
  \item Merancang alur sistem (flowchart, DFD), entity relationship diagram (ERD), dan prototipe antarmuka di Figma.
  \item Mengembangkan aplikasi web menggunakan Laravel dan MySQL dengan penerapan hak akses berbasis peran untuk 5 role pengguna.
  \item Mengintegrasikan payment gateway digital untuk mendukung otomatisasi proses verifikasi pembayaran secara real-time.
  \item Mengimplementasikan fitur live chat secara real-time menggunakan WebSocket (Laravel Reverb) untuk komunikasi pelanggan dan admin.
  \item Menyusun dokumentasi teknis sistem (SRS \& SDD) serta melakukan functional testing untuk memastikan keandalan alur transaksi.
\end{itemize}

\noindent
\textbf{UI/UX Designer \& System Analyst Intern} \textbf{|} PT Swevel Universal Media \textbf{|} \textit{Yogyakarta, Indonesia} \textbf{|} \textit{Sep 2025 -- Jan 2026}
\begin{itemize}
  \item Merancang antarmuka website dan aplikasi mobile di Figma dengan fokus pada prinsip usability, visual hierarchy, dan aksesibilitas.
  \item Menyusun user flow, wireframe, interactive prototype, dan high-fidelity design sebagai acuan implementasi tim pengembang.
  \item Menyusun dokumentasi spesifikasi kebutuhan sistem mencakup Software Requirements Specification (SRS), SDD, dan Manual Book.
  \item Berkolaborasi dengan software engineer untuk mengevaluasi kelayakan teknis dan memastikan akurasi implementasi desain antarmuka.
  \item Menjalankan pengujian usability dan iterasi desain berkala berdasarkan umpan balik pengguna.
\end{itemize}

\noindent
\textbf{UI/UX Designer \& System Analyst Intern} \textbf{|} PT Gama Integra Informatika \textbf{|} \textit{Yogyakarta, Indonesia} \textbf{|} \textit{Jan 2025 -- Jun 2025}
\begin{itemize}
  \item Merancang antarmuka produk digital berbasis web dan mobile mengadopsi prinsip User-Centered Design (UCD).
  \item Membangun wireframe, prototipe interaktif, dan panduan komponen antarmuka (design system) untuk konsistensi visual.
  \item Melakukan wawancara stakeholder dan riset pengguna untuk mengidentifikasi kebutuhan fungsional sistem informasi.
  \item Melakukan evaluasi usability berkelanjutan untuk meningkatkan kenyamanan dan efisiensi alur pengguna.
\end{itemize}

% ── PENDIDIKAN ─────────────────────────────────────────────────────────────────
\section{Pendidikan}

\noindent
\textbf{S1 Sistem Informasi} \textbf{|} Universitas Teknologi Yogyakarta \textbf{|} \textit{Yogyakarta, Indonesia} \textbf{|} \textit{Lulusan 2026} \textbf{|} \textbf{IPK: 3.92 / 4.00 (Cum Laude)}
\begin{itemize}
  \item \textbf{Skripsi:} Sistem Informasi Rental Mobil Berbasis Website - PT AKA Mendunia (Perancangan arsitektur sistem informasi web multi-role, payment gateway, dan real-time WebSocket live chat).
\end{itemize}

\noindent
\textbf{MIPA (Matematika dan Ilmu Pengetahuan Alam)} \textbf{|} SMA Negeri 2 Temanggung \textbf{|} \textit{Temanggung, Indonesia} \textbf{|} \textit{Lulusan 2022}

% ── PENCAPAIAN & PENGHARGAAN ───────────────────────────────────────────────────
\section{Pencapaian \& Penghargaan}

\noindent
\textbf{Juara 1 Lomba UI/UX Design Tingkat Universitas} -- Proyek LIFE+ SuperApp Kesehatan \textbf{|} \textit{2025}
\begin{itemize}
  \item Memimpin riset pengguna melalui wawancara dan kuesioner, merancang arsitektur informasi, serta membangun prototipe interaktif aplikasi mobile kesehatan.
\end{itemize}

% ── PROYEK TERPILIH ────────────────────────────────────────────────────────────
\section{Proyek Portofolio Terpilih}

\noindent
\textbf{Sistem Informasi Rental Mobil Berbasis Web} \textbf{|} \textit{Laravel, PHP, MySQL, WebSocket, Tailwind CSS, Midtrans, Figma} \textbf{|} \textit{2026}
\begin{itemize}
  \item Mengembangkan sistem reservasi armada rental mobil terintegrasi dengan 5 role akses pengguna, manajemen transaksi, pembayaran digital, dan live chat real-time.
\end{itemize}

\noindent
\textbf{LIFE+ Health SuperApp} \textbf{|} \textit{Figma, User Research, Information Architecture, Interactive Prototyping} \textbf{|} \textit{2025}
\begin{itemize}
  \item Merancang konsep antarmuka mobile superApp kesehatan yang mengintegrasikan monitoring gaya hidup sehat dan booking layanan medis (Juara 1 Lomba UI/UX).
\end{itemize}

\noindent
\textbf{Platform Monitoring Tender (tenderplus.id)} \textbf{|} \textit{Figma, UI/UX Design, Information Architecture, Data Visualization} \textbf{|} \textit{2025}
\begin{itemize}
  \item Merancang dashboard monitoring tahapan pengadaan tender barang dan jasa pemerintah untuk mempermudah vendor mengakses informasi secara terstruktur.
\end{itemize}

\noindent
\textbf{Sistem Informasi Pemetaan RTHP Kota Yogyakarta} \textbf{|} \textit{Figma, GIS Interface Design, Spatial Data Navigation} \textbf{|} \textit{2025}
\begin{itemize}
  \item Merancang antarmuka sistem informasi inventarisasi dan pemetaan spasial RTHP berbasis GIS untuk pemantauan tata ruang perkotaan.
\end{itemize}

\noindent
\textbf{Sistem Pengelolaan Arsip dan Progress Riset (Pusjianstralitbang)} \textbf{|} \textit{Figma, System Analysis, Workflow Modeling} \textbf{|} \textit{2025}
\begin{itemize}
  \item Merancang antarmuka sistem web tata kelola pengarsipan dokumen dan pelacakan perkembangan penelitian lintas departemen.
\end{itemize}

% ── KEAHLIAN TEKNIS ────────────────────────────────────────────────────────────
\section{Keahlian Teknis}

\begin{itemize}
  \item \textbf{Analisis Sistem \& Rekayasa:} System Analysis, Software Requirements Specification (SRS), Software Design Description (SDD), Flowchart, Data Flow Diagram (DFD), Entity Relationship Diagram (ERD), Use Case Modeling, Business Process Modeling, Functional Testing.
  \item \textbf{UI/UX Design \& Riset:} User Research, User Flow, Wireframing, Interactive Prototyping, High-Fidelity UI Design, Design Systems, Usability Testing, Heuristic Evaluation, User-Centered Design (UCD).
  \item \textbf{Pemrograman \& Web:} PHP, JavaScript, TypeScript, HTML5, CSS3, Tailwind CSS, Next.js, Laravel Framework, RESTful API.
  \item \textbf{Basis Data \& Real-Time:} MySQL, Relational Database Modeling, WebSocket, Laravel Reverb.
  \item \textbf{Tools \& Lingkungan Kerja:} Figma, Visual Studio Code, Git, GitHub, Draw.io, Postman.
  \item \textbf{Soft Skills:} Problem Solving, Critical Thinking, Cross-Functional Teamwork, Communication, Adaptability.
\end{itemize}

\end{document}
"""

LATEX_ENG = r"""\documentclass[letterpaper,10pt]{article}

% ── Packages ──────────────────────────────────────────────────────────────────
\usepackage[left=0.6in, right=0.6in, top=0.6in, bottom=0.6in]{geometry}
\usepackage{lmodern}
\usepackage[T1]{fontenc}
\usepackage[utf8]{inputenc}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{titlesec}
\usepackage{parskip}

% ── Hyperlink colours (black = ATS safe) ──────────────────────────────────────
\hypersetup{
    colorlinks=true,
    linkcolor=black,
    urlcolor=black,
    citecolor=black
}

% ── Section formatting ────────────────────────────────────────────────────────
\titleformat{\section}
  {\large\bfseries\uppercase}
  {}{0em}{}
  [\titlerule]
\titlespacing{\section}{0pt}{8pt}{4pt}

% ── List spacing ──────────────────────────────────────────────────────────────
\setlist[itemize]{
  leftmargin=1.5em,
  itemsep=2pt,
  parsep=0pt,
  topsep=2pt
}

% ── No page numbers ───────────────────────────────────────────────────────────
\pagestyle{empty}

\begin{document}

% ── HEADER ────────────────────────────────────────────────────────────────────
\begin{center}
  {\LARGE \textbf{HERMAN PRAKOSO}} \\[4pt]
  \textit{System Analyst} \textbf{|} \textit{UI/UX Designer} \textbf{|} \textit{Fullstack Web Developer} \\[4pt]
  Temanggung, Central Java, Indonesia $\bullet$ +62 896-7364-7187 $\bullet$ \href{mailto:herman.prakoso33@gmail.com}{herman.prakoso33@gmail.com} \\
  Portfolio: \href{https://hermanprakoso.vercel.app}{hermanprakoso.vercel.app} $\bullet$ GitHub: \href{https://github.com/Tenku01}{github.com/Tenku01}
\end{center}

\vspace{2pt}

% ── PROFESSIONAL SUMMARY ──────────────────────────────────────────────────────
\section{Professional Summary}

Information Systems graduate from Universitas Teknologi Yogyakarta (GPA 3.92/4.00) with end-to-end expertise in System Analysis, UI/UX Design, and Fullstack Web Development. Experienced in designing relational MySQL database architectures, authoring comprehensive technical documentation (SRS \& SDD), engineering interactive prototypes and design systems in Figma, and developing web applications using Laravel and Tailwind CSS. Proven ability to translate user requirements into functional web systems from initial analysis to implementation and functional testing.

% ── WORK EXPERIENCE ───────────────────────────────────────────────────────────
\section{Work Experience}

\noindent
\textbf{Programmer \& System Analyst} \textbf{|} PT AKA Mendunia Sejahtera \textbf{|} \textit{Temanggung, Indonesia} \textbf{|} \textit{Feb 2026 -- Jun 2026}
\begin{itemize}
  \item Analyzed business workflows and user requirements to design a web-based car rental reservation system.
  \item Engineered system workflows (flowcharts, DFD), entity relationship diagrams (ERD), and interface prototypes in Figma.
  \item Developed web application using Laravel and MySQL with role-based access control across 5 distinct user privilege tiers.
  \item Integrated digital payment gateway to automate real-time transaction verification and billing workflows.
  \item Implemented real-time interactive messaging using WebSockets (Laravel Reverb) between customers and administrators.
  \item Authored Software Requirements Specifications (SRS), SDD, and conducted functional testing to ensure system stability.
\end{itemize}

\noindent
\textbf{UI/UX Designer \& System Analyst Intern} \textbf{|} PT Swevel Universal Media \textbf{|} \textit{Yogyakarta, Indonesia} \textbf{|} \textit{Sep 2025 -- Jan 2026}
\begin{itemize}
  \item Designed responsive web and mobile interfaces in Figma focusing on usability heuristics, visual hierarchy, and accessibility.
  \item Produced comprehensive user flows, wireframes, interactive prototypes, and high-fidelity design specifications for development teams.
  \item Authored technical system documentation including Software Requirements Specifications (SRS), SDD, and User Manuals.
  \item Collaborated with software engineers to evaluate technical feasibility and maintain high visual fidelity during implementation.
  \item Executed usability evaluations and iterated interfaces based on user testing findings and qualitative feedback.
\end{itemize}

\noindent
\textbf{UI/UX Designer \& System Analyst Intern} \textbf{|} PT Gama Integra Informatika \textbf{|} \textit{Yogyakarta, Indonesia} \textbf{|} \textit{Jan 2025 -- Jun 2025}
\begin{itemize}
  \item Designed web and mobile interfaces adhering to User-Centered Design (UCD) methodologies.
  \item Built wireframes, interactive prototypes, and reusable design system component libraries to support engineering velocity.
  \item Conducted stakeholder interviews and user research to identify core functional requirements for information systems.
  \item Performed ongoing usability reviews to optimize user flow efficiency and user satisfaction.
\end{itemize}

% ── EDUCATION ─────────────────────────────────────────────────────────────────
\section{Education}

\noindent
\textbf{Bachelor of Information Systems} \textbf{|} Universitas Teknologi Yogyakarta \textbf{|} \textit{Yogyakarta, Indonesia} \textbf{|} \textit{Graduated 2026} \textbf{|} \textbf{GPA: 3.92 / 4.00 (Cum Laude)}
\begin{itemize}
  \item \textbf{Thesis:} Web-Based Car Rental Information System - PT AKA Mendunia (Multi-role web architecture, payment gateway integration, and real-time WebSocket live chat).
\end{itemize}

\noindent
\textbf{Natural Sciences (MIPA)} \textbf{|} SMA Negeri 2 Temanggung \textbf{|} \textit{Temanggung, Indonesia} \textbf{|} \textit{Graduated 2022}

% ── HONORS & AWARDS ───────────────────────────────────────────────────────────
\section{Honors \& Awards}

\noindent
\textbf{1st Place Winner} -- University UI/UX Design Competition (LIFE+ SuperApp) \textbf{|} \textit{2025}
\begin{itemize}
  \item Led user research via in-depth interviews and qualitative questionnaires, established information architecture, and built interactive mobile health prototypes.
\end{itemize}

% ── KEY PROJECTS ──────────────────────────────────────────────────────────────
\section{Key Projects}

\noindent
\textbf{Car Rental Reservation Web System} \textbf{|} \textit{Laravel, PHP, MySQL, WebSocket, Tailwind CSS, Midtrans, Figma} \textbf{|} \textit{2026}
\begin{itemize}
  \item Engineered integrated car rental reservation platform supporting 5 user privilege roles, fleet management, digital payment automation, and real-time live chat.
\end{itemize}

\noindent
\textbf{LIFE+ Health SuperApp} \textbf{|} \textit{Figma, UX Research, Information Architecture, Interactive Prototyping} \textbf{|} \textit{2025}
\begin{itemize}
  \item Designed comprehensive mobile superApp interface integrating wellness habit tracking and clinical service booking (1st Place Winner in UI/UX Competition).
\end{itemize}

\noindent
\textbf{Tender Monitoring Platform (tenderplus.id)} \textbf{|} \textit{Figma, UI/UX Design, Information Architecture, Data Visualization} \textbf{|} \textit{2025}
\begin{itemize}
  \item Designed government procurement tender monitoring dashboard for vendors to review bidding stages and spatial analytics efficiently.
\end{itemize}

\noindent
\textbf{Public Green Open Space (RTHP) GIS Mapping Portal} \textbf{|} \textit{Figma, GIS Interface Design, Spatial Data Navigation} \textbf{|} \textit{2025}
\begin{itemize}
  \item Designed spatial GIS mapping and public green open space inventory interface for municipal urban planning monitoring.
\end{itemize}

\noindent
\textbf{Archive \& Research Progress Tracking System} \textbf{|} \textit{Figma, System Analysis, Workflow Modeling} \textbf{|} \textit{2025}
\begin{itemize}
  \item Architected web-based system interface for centralized research document archiving and milestone progress monitoring across departments.
\end{itemize}

% ── TECHNICAL SKILLS ──────────────────────────────────────────────────────────
\section{Technical Skills}

\begin{itemize}
  \item \textbf{System Analysis \& Architecture:} System Analysis, Software Requirements Specification (SRS), Software Design Description (SDD), Flowchart, Data Flow Diagram (DFD), Entity Relationship Diagram (ERD), Use Case Modeling, Business Process Modeling, Functional Testing.
  \item \textbf{UI/UX Design \& Research:} User Research, User Flow, Wireframing, Interactive Prototyping, High-Fidelity UI Design, Design Systems, Usability Testing, Heuristic Evaluation, User-Centered Design (UCD).
  \item \textbf{Web Development \& Stack:} PHP, JavaScript, TypeScript, HTML5, CSS3, Tailwind CSS, Next.js, Laravel Framework, RESTful API.
  \item \textbf{Database \& Real-Time:} MySQL, Relational Database Modeling, WebSocket, Laravel Reverb.
  \item \textbf{Tools \& Workflow:} Figma, Visual Studio Code, Git, GitHub, Draw.io, Postman.
  \item \textbf{Soft Skills:} Problem Solving, Critical Thinking, Cross-Functional Teamwork, Communication, Adaptability.
\end{itemize}

\end{document}
"""

def print_pdf(html_path, pdf_path):
    edge_exe = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    if not os.path.exists(edge_exe):
        edge_exe = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"
    
    cmd = [
        edge_exe,
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_path}",
        html_path
    ]
    print(f"Printing: {html_path} -> {pdf_path}")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if os.path.exists(pdf_path):
        size = os.path.getsize(pdf_path)
        with open(pdf_path, "rb") as f:
            pdf_data = f.read()
        page_count = len(re.findall(rb'/Type\s*/Page\b', pdf_data))
        print(f"Success: {pdf_path} ({size} bytes, {page_count} pages)")
        return page_count
    else:
        print(f"Error printing {pdf_path}: {res.stderr}")
        return 0

def main():
    ind_html_path = os.path.join(PROJECT_ROOT, "cv_ats_ind.html")
    eng_html_path = os.path.join(PROJECT_ROOT, "cv_ats_eng.html")

    with open(ind_html_path, "w", encoding="utf-8") as f:
        f.write(generate_indonesian_html())
    
    with open(eng_html_path, "w", encoding="utf-8") as f:
        f.write(generate_english_html())

    # Save LaTeX files
    cv_ind_tex = os.path.join(PROJECT_ROOT, "CV_baru_Ind.tex")
    cv_eng_tex = os.path.join(PROJECT_ROOT, "CV_baru_eng.tex")
    with open(cv_ind_tex, "w", encoding="utf-8") as f:
        f.write(LATEX_IND)
    with open(cv_eng_tex, "w", encoding="utf-8") as f:
        f.write(LATEX_ENG)
    print(f"LaTeX files saved: {cv_ind_tex}, {cv_eng_tex}")

    # Generate PDFs
    cv_ind_pdf = os.path.join(PROJECT_ROOT, "CV baru_Ind.pdf")
    cv_eng_pdf = os.path.join(PROJECT_ROOT, "CV baru_eng.pdf")
    cv_default_pdf = os.path.join(PROJECT_ROOT, "CV baru.pdf")
    cv_public_pdf = os.path.join(PROJECT_ROOT, "public", "files", "cv-herman-prakoso.pdf")

    p1 = print_pdf(ind_html_path, cv_ind_pdf)
    p2 = print_pdf(eng_html_path, cv_eng_pdf)

    if os.path.exists(cv_ind_pdf):
        shutil.copy2(cv_ind_pdf, cv_default_pdf)
        shutil.copy2(cv_ind_pdf, cv_public_pdf)
        print(f"Copied to {cv_default_pdf} and {cv_public_pdf}")

    print(f"Final Page Counts -> Indo: {p1}, Eng: {p2}")

if __name__ == "__main__":
    main()
