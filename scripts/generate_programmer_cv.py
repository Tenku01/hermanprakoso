import os
import subprocess
import shutil
import re

CSS = """
@page {
  size: A4 portrait;
  margin: 0.42in 0.5in 0.42in 0.5in;
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
  font-size: 9pt;
  line-height: 1.3;
}

.cv-header {
  text-align: center;
  margin-bottom: 6pt;
}

.cv-name {
  font-size: 17pt;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5pt;
  margin-bottom: 1.5pt;
  color: #000000;
}

.cv-title {
  font-size: 10pt;
  font-weight: bold;
  font-style: italic;
  margin-bottom: 2.5pt;
  color: #000000;
}

.cv-contact {
  font-size: 8.6pt;
  line-height: 1.35;
  color: #000000;
}

.cv-contact a {
  color: #000000;
  text-decoration: none;
}

.section {
  margin-top: 5pt;
  margin-bottom: 2pt;
}

.section-title {
  font-size: 10pt;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5pt;
  border-bottom: 1pt solid #000000;
  padding-bottom: 1pt;
  margin-bottom: 3.5pt;
  color: #000000;
}

.summary-p {
  font-size: 8.7pt;
  line-height: 1.32;
  text-align: justify;
  margin-bottom: 2pt;
}

.item-block {
  margin-bottom: 4pt;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 9.2pt;
  margin-bottom: 0.5pt;
}

.item-title-left {
  font-weight: bold;
}

.item-title-right {
  font-weight: normal;
  font-style: italic;
  font-size: 8.6pt;
  white-space: nowrap;
}

.item-sub-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 8.6pt;
  font-style: italic;
  margin-bottom: 1.5pt;
}

.item-sub-left {
  font-style: italic;
}

.item-sub-right {
  font-style: italic;
}

ul.bullet-list {
  margin-left: 13pt;
  padding-left: 0;
  margin-top: 1pt;
  margin-bottom: 1.5pt;
}

ul.bullet-list li {
  font-size: 8.5pt;
  line-height: 1.28;
  margin-bottom: 1.5pt;
  text-align: justify;
}

ul.skills-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

ul.skills-list li {
  font-size: 8.6pt;
  line-height: 1.32;
  margin-bottom: 1.5pt;
}

ul.skills-list li strong {
  font-weight: bold;
}
"""

def generate_html():
    return f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Herman Prakoso - CV Programmer</title>
  <style>{CSS}</style>
</head>
<body>
  <div class="cv-header">
    <div class="cv-name">Herman Prakoso</div>
    <div class="cv-title">Web Programmer | PHP &amp; Basis Data | System Analyst</div>
    <div class="cv-contact">
      Temanggung, Jawa Tengah, Indonesia | +62 896-7364-7187 | <a href="mailto:herman.prakoso33@gmail.com">herman.prakoso33@gmail.com</a><br>
      Portofolio: <a href="https://hermanprakoso.vercel.app">hermanprakoso.vercel.app</a> | GitHub: <a href="https://github.com/Tenku01">github.com/Tenku01</a>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Ringkasan Profesional</div>
    <p class="summary-p">
      Lulusan S1 Sistem Informasi Universitas Teknologi Yogyakarta (IPK 3.92/4.00, Cum Laude) dengan keahlian solid dalam dasar pemrograman web (PHP, JavaScript, HTML5/CSS3), perancangan basis data relasional MySQL, serta pengujian dan pelaporan sistem (SRS &amp; SDD). Berpengalaman membangun aplikasi web berbasis Laravel dan MySQL, merancang alur sistem informasi klinis/kesehatan (Juara 1 Lomba UI/UX), serta terbiasa menyelesaikan proyek perangkat lunak dari analisis kebutuhan hingga pengujian fungsional. Memiliki komitmen tinggi dan siap berkontribusi optimal 6 hari kerja per minggu sebagai peserta magang pemrograman klinik.
    </p>
  </div>

  <div class="section">
    <div class="section-title">Pendidikan</div>
    <div class="item-block">
      <div class="item-header">
        <span class="item-title-left">Universitas Teknologi Yogyakarta</span>
        <span class="item-title-right">Lulusan 2026</span>
      </div>
      <div class="item-sub-header">
        <span class="item-sub-left">S1 Sistem Informasi &mdash; IPK: 3.92 / 4.00 (Cum Laude)</span>
        <span class="item-sub-right">Yogyakarta, Indonesia</span>
      </div>
      <ul class="bullet-list">
        <li><strong>Fokus Bidang:</strong> Rekayasa Perangkat Lunak, Pemrograman Web, Pemodelan Basis Data, Pengujian Sistem. Skripsi: Perancangan Sistem Informasi Web Multi-Role Menggunakan PHP Laravel, MySQL, dan Real-time WebSocket.</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Keahlian Teknis</div>
    <ul class="skills-list">
      <li><strong>Pemrograman &amp; Tampilan Web:</strong> PHP, JavaScript, TypeScript, HTML5, CSS3, Tailwind CSS, Alpine.js, Laravel Framework, RESTful API.</li>
      <li><strong>Basis Data:</strong> MySQL, Relational Database Modeling, Normalisasi Tabel, Query Optimization, Entity Relationship Diagram (ERD).</li>
      <li><strong>Pengujian &amp; Pelaporan Teknis:</strong> Functional Testing, Black Box Testing, Bug Reporting, Software Requirements Specification (SRS), Software Design Description (SDD), User Manual.</li>
      <li><strong>Desain Antarmuka &amp; Alur Sistem:</strong> Figma (UI/UX, Wireframe, Prototyping), System Workflow (Flowchart, Data Flow Diagram/DFD), UML/Use Case.</li>
      <li><strong>Tools &amp; Lingkungan Kerja:</strong> Visual Studio Code, Git, GitHub, Postman, Draw.io.</li>
    </ul>
  </div>

  <div class="section">
    <div class="section-title">Pengalaman Kerja &amp; Magang</div>

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
        <li>Mengembangkan aplikasi web sistem informasi menggunakan PHP (Laravel) dan MySQL dengan implementasi hak akses 5 role pengguna.</li>
        <li>Merancang struktur tabel basis data relasional, modul reservasi, serta integrasi payment gateway untuk otomasi verifikasi transaksi real-time.</li>
        <li>Mengimplementasikan fitur komunikasi real-time menggunakan WebSocket serta membangun antarmuka web interaktif berbasis JavaScript.</li>
        <li>Menyusun dokumen teknis (SRS &amp; SDD) dan menjalankan functional testing untuk memastikan keandalan alur transaksi sistem.</li>
      </ul>
    </div>

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
        <li>Merancang arsitektur antarmuka web dan layout responsif di Figma dengan memprioritaskan kemudahan pengguna dan konsistensi visual.</li>
        <li>Menyusun dokumentasi kebutuhan perangkat lunak mencakup SRS, SDD, dan panduan penggunaan sistem (User Manual).</li>
        <li>Berkolaborasi dengan tim software engineer untuk memastikan akurasi implementasi tampilan web dan logika sistem.</li>
      </ul>
    </div>

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
        <li>Menganalisis kebutuhan fungsional sistem informasi dan alur bisnis operasional melalui wawancara stakeholder dan riset pengguna.</li>
        <li>Membangun wireframe, user flow, dan prototipe komponen web interaktif guna mendukung percepatan pengerjaan pengembang.</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Proyek Terkait &amp; Prestasi</div>

    <div class="item-block">
      <div class="item-header">
        <span class="item-title-left">LIFE+ Health SuperApp &mdash; Juara 1 Lomba UI/UX Design Tingkat Universitas</span>
        <span class="item-title-right">2025</span>
      </div>
      <div class="item-sub-header">
        <span class="item-sub-left">Teknologi: Figma, User Research, Information Architecture, Clinical Service Flow Design</span>
      </div>
      <ul class="bullet-list">
        <li>Merancang konsep antarmuka dan alur operasional sistem kesehatan yang mencakup modul reservasi layanan medis klinik, riwayat konsultasi pasien, dan pemantauan kesehatan berkala.</li>
      </ul>
    </div>

    <div class="item-block">
      <div class="item-header">
        <span class="item-title-left">Portal Layanan &amp; Transparansi Keuangan (Website Dusun Demangan)</span>
        <span class="item-title-right">2026</span>
      </div>
      <div class="item-sub-header">
        <span class="item-sub-left">Teknologi: PHP, Laravel, Tailwind CSS, Alpine.js, MySQL, REST API</span>
      </div>
      <ul class="bullet-list">
        <li>Mengembangkan sistem web pelayanan publik terintegrasi mencakup pencatatan buku kas transaksi masuk/keluar, katalog &amp; approval peminjaman inventaris, serta laporan rekapitulasi iuran warga.</li>
      </ul>
    </div>
  </div>
</body>
</html>"""

def main():
    root = r"D:\PORTO"
    html_content = generate_html()
    html_path = os.path.join(root, "HermanPrakoso_CV_Programmer.html")
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_content)

    edge_exe = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    if not os.path.exists(edge_exe):
        edge_exe = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

    pdf_root = os.path.join(root, "HermanPrakoso_CV_Programmer.pdf")
    pdf_public = os.path.join(root, "public", "files", "HermanPrakoso_CV_Programmer.pdf")

    cmd = [
        edge_exe,
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_root}",
        html_path
    ]
    subprocess.run(cmd, check=True)
    shutil.copy2(pdf_root, pdf_public)
    
    with open(pdf_root, "rb") as f:
        pdf_data = f.read()
    page_count = len(re.findall(rb'/Type\s*/Page\b', pdf_data))
    print(f"Generated PDF: {pdf_root}, Page Count: {page_count}, Size: {os.path.getsize(pdf_root)} bytes")

if __name__ == "__main__":
    main()
