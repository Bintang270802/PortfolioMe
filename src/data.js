import HeroImage from "/assets/hero-img.webp";

const Image = {
  HeroImage,
};

export default Image;

import Tools1 from "/assets/tools/vscode.png";
import Tools2 from "/assets/tools/reactjs.png";
import Tools3 from "/assets/tools/nextjs.png";
import Tools4 from "/assets/tools/tailwind.png";
import Tools5 from "/assets/tools/bootstrap.png";
import Tools6 from "/assets/tools/js.png";
import Tools7 from "/assets/tools/nodejs.png";
import Tools8 from "/assets/tools/github.png";
import Tools9 from "/assets/tools/Express.png";
import Tools10 from "/assets/tools/php.png";
import Tools11 from "/assets/tools/figma.png";
import Tools12 from "/assets/tools/supabase.jpg";
import Tools13 from "/assets/tools/PostgresSQL.png";
import Tools14 from "/assets/tools/html.png";
import Tools15 from "/assets/tools/css.png";
import Tools16 from "/assets/tools/ts.png";
import Tools17 from "/assets/tools/Vue.js.png";
import Tools18 from "/assets/tools/vite.png";
import Tools19 from "/assets/tools/mysql.png";
import Tools20 from "/assets/tools/Laravel.png";

export const listTools = [
  {
    id: 1,
    gambar: Tools1,
    nama: "Visual Studio Code",
    ket: "Code Editor",
    dad: "100",
  },
  {
    id: 2,
    gambar: Tools2,
    nama: "React JS",
    ket: "Framework",
    dad: "200",
  },
  {
    id: 3,
    gambar: Tools3,
    nama: "Next JS",
    ket: "Framework",
    dad: "300",
  },
  {
    id: 4,
    gambar: Tools4,
    nama: "Tailwind CSS",
    ket: "Framework",
    dad: "400",
  },
  {
    id: 5,
    gambar: Tools5,
    nama: "Bootstrap",
    ket: "Framework",
    dad: "500",
  },
  {
    id: 6,
    gambar: Tools6,
    nama: "Javascript",
    ket: "Language",
    dad: "600",
  },
  {
    id: 7,
    gambar: Tools7,
    nama: "Node JS",
    ket: "Javascript Runtime",
    dad: "700",
  },
  {
    id: 8,
    gambar: Tools8,
    nama: "Github",
    ket: "Repository",
    dad: "800",
  },
  {
    id: 9,
    gambar: Tools9,
    nama: "Express JS",
    ket: "Framework",
    dad: "900",
  },
  {
    id: 10,
    gambar: Tools10,
    nama: "php",
    ket: "Language",
    dad: "1000",
  },
  {
    id: 11,
    gambar: Tools11,
    nama: "Figma",
    ket: "Design App",
    dad: "1100",
  },
  {
    id: 12,
    gambar: Tools12,
    nama: "Supabase",
    ket: "Database",
    dad: "1200",
  },
  {
    id: 13,
    gambar: Tools13,
    nama: "PostgreSQL",
    ket: "Database",
    dad: "1300",
  },
  {
    id: 14,
    gambar: Tools14,
    nama: "HTML",
    ket: "Language",
    dad: "1400",
  },
  {
    id: 15,
    gambar: Tools15,
    nama: "CSS",
    ket: "Language",
    dad: "1500",
  },
  {
    id: 16,
    gambar: Tools16,
    nama: "TypeScript",
    ket: "Language",
    dad: "1600",
  },
  {
    id: 17,
    gambar: Tools17,
    nama: "Visual Studio Code",
    ket: "Code Editor",
    dad: "1700",
  },
  {
    id: 18,
    gambar: Tools18,
    nama: "Vite",
    ket: "Framework",
    dad: "1800",
  },
  {
    id: 19,
    gambar: Tools19,
    nama: "MySql",
    ket: "Framework",
    dad: "1900",
  },
  {
    iid: 20,
    gambar: Tools20,
    nama: "Laravel",
    ket: "Fremwork",
    dad: "2000",
  },
];

import lpkzenglobal from "/assets/proyek/lpkzenglobal.png";
import quisubs from "/assets/proyek/quisubs.png";
import videoubs from "/assets/proyek/videoubs.png";
import mkvi from "/assets/proyek/mkvi.png";
import rfidAttendance from "/assets/proyek/rfid.png";
// Using profile image as placeholder for PT. ESSAI until actual image is added
import essaiCompany from "/assets/proyek/profile.jpeg";

// Helper function to get localized text
export const getLocalizedText = (textObj, language) => {
  if (typeof textObj === 'string') return textObj;
  return textObj[language] || textObj.id || textObj.en || textObj;
};

export const listProyek = [
  {
    id: 1,
    image: lpkzenglobal,
    title: {
      id: "Website Company Profile LPK ZEN GLOBAL",
      en: "LPK ZEN GLOBAL Company Profile Website"
    },
    subtitle: {
      id: "Pengembangan Website Company Profile sebagai Media Informasi Resmi LPK ZEN Global Indonesia dalam Menyampaikan Program Pelatihan, Persyaratan, dan Alur Pendaftaran Kerja ke Jepang dan Korea.",
      en: "Development of Company Profile Website as Official Information Media for LPK ZEN Global Indonesia in Delivering Training Programs, Requirements, and Registration Process for Work in Japan and Korea."
    },
    fullDescription: {
      id: "LPK ZEN Global Indonesia merupakan lembaga pelatihan kerja yang bergerak di bidang pengembangan sumber daya manusia dengan fokus pada persiapan dan penempatan tenaga kerja ke luar negeri, khususnya ke Jepang dan Korea. Lembaga ini berkomitmen untuk mencetak tenaga kerja yang kompeten, profesional, dan siap bersaing di pasar kerja internasional melalui program pelatihan yang terstruktur dan berstandar global | LPK ZEN Global Indonesia menyediakan berbagai program pelatihan yang mencakup pelatihan bahasa asing (Bahasa Jepang dan Korea), pembekalan budaya kerja, pengembangan keterampilan teknis, serta peningkatan soft skills yang dibutuhkan di dunia industri luar negeri. Seluruh program dirancang untuk menyesuaikan dengan kebutuhan industri dan regulasi ketenagakerjaan negara tujuan.",
      en: "LPK ZEN Global Indonesia is a job training institution engaged in human resource development with a focus on preparation and placement of workers abroad, especially to Japan and Korea. This institution is committed to producing competent, professional workers who are ready to compete in the international job market through structured and globally standardized training programs | LPK ZEN Global Indonesia provides various training programs that include foreign language training (Japanese and Korean), work culture briefing, technical skills development, and soft skills improvement needed in overseas industries. All programs are designed to adapt to industry needs and employment regulations of destination countries."
    },
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/Bintang270802",
    figmaUrl: "https://www.figma.com/design/lhmqavcA2vVMHwEkwkz3hS/Lpk-Zen-Global?node-id=0-1&t=kgSmoPlqeM6tcrxk-1",
    liveUrl: "https://lpkzenglobal.com/",
    dad: "100",
  },
  {
    id: 2,
    image: quisubs,
    title: {
      id: "Aplikasi Pembelajaran Quis Berbasis Android & Website",
      en: "Android & Website Based Quiz Learning Application"
    },
    subtitle: {
      id: "Perancangan dan Implementasi Aplikasi Pembelajaran Berbasis Kuis sebagai Media Evaluasi Pembelajaran yang Terintegrasi antara Platform Android dan Website untuk Meningkatkan Efektivitas Proses Belajar Mengajar Pada TK Bani Saleh",
      en: "Design and Implementation of Quiz-Based Learning Application as Integrated Learning Evaluation Media between Android and Website Platforms to Improve Teaching and Learning Process Effectiveness at TK Bani Saleh"
    },
    fullDescription: {
      id: "aplikasi pembelajaran berbasis kuis yang dirancang untuk mendukung proses belajar secara interaktif, menarik, dan mudah diakses melalui platform Android dan Website. Aplikasi ini bertujuan untuk membantu pengguna dalam memahami materi pembelajaran sekaligus melakukan evaluasi hasil belajar secara mandiri maupun terstruktur dengan dashboard admin yang berfungsi untuk mengelola data pengguna, soal, jawaban, serta hasil penilaian secara menyeluruh. Dengan konsep full CRUD, admin dapat dengan mudah menambah, mengubah, menghapus, dan memantau data pembelajaran melalui sistem yang terintegrasi dan aman.",
      en: "A quiz-based learning application designed to support interactive, engaging, and easily accessible learning processes through Android and Website platforms. This application aims to help users understand learning materials while conducting independent or structured learning outcome evaluations with an admin dashboard that functions to manage user data, questions, answers, and assessment results comprehensively. With a full CRUD concept, admins can easily add, modify, delete, and monitor learning data through an integrated and secure system."
    },
    technologies: ["React.js", "Node.js", "Express.js", "MySQL", "Android", "Java"],
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://github.com/Bintang270802",
    figmaUrl: "https://www.figma.com/design/G42hjnOf6IJU4h2Mq5gYUT/Edukasi-Pembelajaran---UBS?node-id=0-1&t=kgSmoPlqeM6tcrxk-1",
    liveUrl: "https://quisubs-demo.com",
    dad: "200",
  },
  {
    id: 3,
    image: videoubs,
    title: {
      id: "Aplikasi Video Pembelajaran Berbasis Android",
      en: "Android Based Video Learning Application"
    },
    subtitle: {
      id: "Perancangan dan Implementasi Aplikasi Video Pembelajaran sebagai Media Pembelajaran Digital Interaktif untuk Mendukung Proses Belajar Mengajar Menggunakan Pendekatan Metode Prototype.",
      en: "Design and Implementation of Video Learning Application as Interactive Digital Learning Media to Support Teaching and Learning Process Using Prototype Method Approach."
    },
    fullDescription: {
      id: "Video UBS merupakan aplikasi video pembelajaran berbasis Android dan Website yang dirancang sebagai media pembelajaran digital untuk mendukung proses belajar mengajar secara modern, interaktif, dan fleksibel. Aplikasi ini bertujuan untuk memudahkan pengguna dalam mengakses materi pembelajaran berbentuk video kapan saja dan di mana saja Aplikasi ini juga dilengkapi dengan dashboard admin berbasis full CRUD, yang memungkinkan pengelola untuk menambahkan, mengubah, menghapus, dan mengelola data video, kategori materi, serta informasi pendukung pembelajaran secara terpusat. Hal ini memudahkan pengelolaan konten dan memastikan materi yang disajikan selalu актуal dan relevan.",
      en: "Video UBS is an Android and Website-based video learning application designed as digital learning media to support modern, interactive, and flexible teaching and learning processes. This application aims to make it easier for users to access video-based learning materials anytime and anywhere. The application is also equipped with a full CRUD-based admin dashboard, which allows managers to add, modify, delete, and manage video data, material categories, and learning support information centrally. This facilitates content management and ensures that the materials presented are always current and relevant."
    },
    technologies: ["React.js", "Node.js", "Express.js", "MySQL", "Android", "Java", "Video Streaming"],
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/Bintang270802",
    figmaUrl: "https://www.figma.com/design/1k285ILp5kIA3qqmoaeWUX/Proyek-UBS?node-id=0-1&t=rdJ6vasXzsIr0wlQ-1",
    liveUrl: "https://videoubs-demo.com",
    dad: "300",
  },
  {
    id: 4,
    image: rfidAttendance,
    title: {
      id: "Sistem Absensi Siswa Berbasis RFID",
      en: "RFID-Based Student Attendance System"
    },
    subtitle: {
      id: "Sistem Absensi Otomatis Menggunakan Teknologi RFID untuk Meningkatkan Efisiensi dan Akurasi Pencatatan Kehadiran Siswa di Lingkungan Sekolah",
      en: "Automatic Attendance System Using RFID Technology to Improve Efficiency and Accuracy of Student Attendance Recording in School Environment"
    },
    fullDescription: {
      id: "Sistem Absensi Siswa Berbasis RFID merupakan solusi teknologi modern yang dirancang untuk mengotomatisasi proses pencatatan kehadiran siswa di sekolah. Sistem ini menggunakan teknologi Radio Frequency Identification (RFID) yang memungkinkan siswa untuk melakukan absensi hanya dengan menempelkan kartu RFID mereka pada reader yang telah disediakan. Sistem ini terintegrasi dengan database yang menyimpan data siswa, jadwal pelajaran, dan riwayat kehadiran secara real-time | Aplikasi ini dilengkapi dengan dashboard admin berbasis web yang memungkinkan guru dan staff administrasi untuk memantau kehadiran siswa, menghasilkan laporan absensi, dan mengelola data siswa secara terpusat. Sistem juga dapat mengirimkan notifikasi otomatis kepada orang tua melalui SMS atau email ketika anak mereka terlambat atau tidak hadir, sehingga meningkatkan komunikasi antara sekolah dan orang tua.",
      en: "RFID-Based Student Attendance System is a modern technology solution designed to automate the student attendance recording process in schools. This system uses Radio Frequency Identification (RFID) technology that allows students to take attendance simply by tapping their RFID cards on the provided reader. The system is integrated with a database that stores student data, class schedules, and attendance history in real-time | The application is equipped with a web-based admin dashboard that allows teachers and administrative staff to monitor student attendance, generate attendance reports, and manage student data centrally. The system can also send automatic notifications to parents via SMS or email when their children are late or absent, thereby improving communication between school and parents."
    },
    technologies: ["PHP", "MySQL", "JavaScript", "RFID", "Arduino", "IoT"],
    borderColor: "#EF4444",
    gradient: "linear-gradient(145deg, #EF4444, #000)",
    url: "https://github.com/Bintang270802",
    figmaUrl: "https://www.figma.com/design/hQ4o6Q7yxD6KuQnwlkllIT/Smp-Ulil-Albab?node-id=0-1&t=xeE4tfhR98uccZ0I-1",
    liveUrl: "https://ulilalbab.sch.id/",
    dad: "400",
  },
  {
    id: 5,
    image: essaiCompany,
    title: {
      id: "Website Company Profile PT. ESSAI",
      en: "PT. ESSAI Company Profile Website"
    },
    subtitle: {
      id: "Pengembangan Website Company Profile PT. ESSAI sebagai Media Informasi Digital untuk Menampilkan Profil Perusahaan, Layanan, dan Portofolio Bisnis secara Profesional",
      en: "Development of PT. ESSAI Company Profile Website as Digital Information Media to Showcase Company Profile, Services, and Business Portfolio Professionally"
    },
    fullDescription: {
      id: "Website Company Profile PT. ESSAI merupakan platform digital yang dirancang untuk mempresentasikan identitas perusahaan, visi misi, layanan unggulan, dan pencapaian bisnis PT. ESSAI kepada klien potensial dan stakeholder. Website ini dikembangkan dengan pendekatan modern dan responsif untuk memastikan pengalaman pengguna yang optimal di berbagai perangkat | Website ini menampilkan informasi lengkap tentang sejarah perusahaan, tim manajemen, layanan yang ditawarkan, portofolio proyek, testimoni klien, dan informasi kontak. Desain yang profesional dan user-friendly membantu membangun kredibilitas perusahaan dan mempermudah calon klien dalam memahami kapabilitas dan keunggulan PT. ESSAI di industri yang digelutinya.",
      en: "PT. ESSAI Company Profile Website is a digital platform designed to present the company identity, vision and mission, flagship services, and business achievements of PT. ESSAI to potential clients and stakeholders. This website is developed with a modern and responsive approach to ensure optimal user experience across various devices | The website displays complete information about company history, management team, offered services, project portfolio, client testimonials, and contact information. Professional and user-friendly design helps build company credibility and makes it easier for potential clients to understand PT. ESSAI's capabilities and advantages in their industry."
    },
    technologies: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    borderColor: "#8B5CF6",
    gradient: "linear-gradient(145deg, #8B5CF6, #000)",
    url: "https://github.com/Bintang270802",
    figmaUrl: "https://www.figma.com/design/pt-essai-company-profile",
    liveUrl: "https://pt-essai.com",
    dad: "500",
  },
  {
    id: 6,
    image: mkvi,
    title: {
      id: "Aplikasi Pemesanan Layanan Fotografer Online MKVI",
      en: "Online Photographer Service Booking Application MKVI"
    },
    subtitle: {
      id: "Sistem pemesanan jasa fotografer online untuk pengelolaan jadwal, layanan, dan operasional secara terintegrasi.",
      en: "An online photographer service booking system for managing schedules, services, and operations in an integrated platform."
    },
    fullDescription: {
      id : "Online Photographer Service Booking Application MKVI merupakan aplikasi berbasis web yang dirancang untuk memudahkan proses pemesanan jasa fotografer secara online. Aplikasi ini dikembangkan untuk mendukung kebutuhan operasional Myer Kreatif Vision Vibe (MKVI) dalam mengelola layanan fotografi secara terstruktur, efisien, dan terintegrasi | Sistem ini memungkinkan pelanggan untuk melihat daftar layanan fotografi, memilih fotografer, menentukan jadwal pemotretan, serta melakukan pemesanan secara langsung melalui platform digital. Di sisi admin, aplikasi menyediakan dashboard manajemen untuk mengelola data fotografer, jadwal kerja, pesanan pelanggan, serta status layanan.",
      en: "The Online Photographer Service Booking Application MKVI is a web-based application designed to simplify the process of booking photographer services online. This application was developed to support the operational needs of Myer Kreatif Vision Vibe (MKVI) by managing photography services in a structured, efficient, and integrated manner | The system allows customers to browse available photography services, select photographers, schedule photo sessions, and place bookings directly through a digital platform. On the admin side, the application provides a management dashboard to handle photographer data, work schedules, customer bookings, and service status."
    },
    technologies: ["React.js", "Express.js", "Node.js", "MySQL", "Figma", "Postman", "TypeScript", "JavaScript", "Tailwind"],
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://github.com/Bintang270802",
    figmaUrl: "https://www.figma.com/design/s6260cTlu5lJeZXNh6Iel1/mkvi?node-id=0-1&t=TggySZoA4WxLgcMJ-1",
    liveUrl: "http://localhost:5173/portofolio/",
    dad: "600",
  },
];

// Data Sertifikat
export const listSertifikat = [
  {
    id: 1,
    nama: {
      id: "CCNA (Cisco Certified Network Associate)",
      en: "CCNA (Cisco Certified Network Associate)"
    },
    penerbit: "Cisco",
    tanggal: "2024",
    gambar: "/portofolio/assets/sertifikat/ccna.jpg",
    deskripsi: {
      id: "Sertifikasi jaringan komputer dan infrastruktur IT dari Cisco Systems",
      en: "Computer networking and IT infrastructure certification from Cisco Systems"
    },
    kredensial: "Universitas Bani Saleh",
    url: "/portofolio/assets/sertifikat/ccna.jpg",
    kategori: {
      id: "Jaringan & Infrastruktur",
      en: "Network & Infrastructure"
    },
    dad: "100"
  },
  {
    id: 2,
    nama: {
      id: "IT Essentials",
      en: "IT Essentials"
    },
    penerbit: "Cisco Networking Academy",
    tanggal: "2024",
    gambar: "/portofolio/assets/sertifikat/essentials.jpg",
    deskripsi: {
      id: "Sertifikasi dasar-dasar teknologi informasi dan troubleshooting hardware",
      en: "Information technology fundamentals and hardware troubleshooting certification"
    },
    kredensial: "Universitas Bani Saleh",
    url: "/portofolio/assets/sertifikat/essentials.jpg",
    kategori: {
      id: "Dasar IT",
      en: "IT Fundamentals"
    },
    dad: "200"
  },
  {
    id: 3,
    nama: {
      id: "Microsoft Office Specialist",
      en: "Microsoft Office Specialist"
    },
    penerbit: "Microsoft",
    tanggal: "2024",
    gambar: "/portofolio/assets/sertifikat/office.jpg",
    deskripsi: {
      id: "Sertifikasi keahlian dalam menggunakan aplikasi Microsoft Office Suite",
      en: "Proficiency certification in using Microsoft Office Suite applications"
    },
    kredensial: "25DIP00015",
    url: "/portofolio/assets/sertifikat/office.jpg",
    kategori: {
      id: "Produktivitas Kantor",
      en: "Office Productivity"
    },
    dad: "300"
  },
  {
    id: 4,
    nama: {
      id: "Oracle Database Certification",
      en: "Oracle Database Certification"
    },
    penerbit: "Oracle Corporation",
    tanggal: "2024",
    gambar: "/portofolio/assets/sertifikat/oracle.jpg",
    deskripsi: {
      id: "Sertifikasi administrasi dan pengembangan database Oracle",
      en: "Oracle database administration and development certification"
    },
    kredensial: "20/TR/DB/RHD/2023-1/2024",
    url: "/portofolio/assets/sertifikat/oracle.jpg",
    kategori: {
      id: "Manajemen Database",
      en: "Database Management"
    },
    dad: "400"
  },  
  {
    id: 5,
    nama: {
      id: "SAP Certification",
      en: "SAP Certification"
    },
    penerbit: "SAP",
    tanggal: "2024",
    gambar: "/portofolio/assets/sertifikat/sap.jpg",
    deskripsi: {
      id: "Sertifikasi sistem enterprise resource planning (ERP) SAP",
      en: "SAP enterprise resource planning (ERP) system certification"
    },
    kredensial: "550171397",
    url: "/portofolio/assets/sertifikat/sap.jpg",
    kategori: {
      id: "Sistem Enterprise",
      en: "Enterprise Systems"
    },
    dad: "500"
  },
  {
    id: 6,
    nama: {
      id: "Seminar Programmer",
      en: "Programming Seminar"
    },
    penerbit: "Programming Community",
    tanggal: "2024",
    gambar: "/portofolio/assets/sertifikat/seminar.jpg",
    deskripsi: {
      id: "Sertifikat kehadiran seminar pengembangan software dan best practices programming",
      en: "Attendance certificate for software development seminar and programming best practices"
    },
    kredensial: "Universitas Bani Saleh",
    url: "/portofolio/assets/sertifikat/seminar.jpg",
    kategori: {
      id: "Pengembangan Profesional",
      en: "Professional Development"
    },
    dad: "600"
  }
];

// Data Pengalaman Kerja
export const listPengalaman = [
  {
    id: 1,
    posisi: {
      id: "FullStack Developer",
      en: "FullStacK developer"
    },
    perusahaan: "PT Erno Sentosa Abadi",
    periode: "2025 - Present",
    tanggalMulai: "2025-06",
    tanggalSelesai: "Present",
    lokasi: "Cibitung, Indonesia",
    tipe: "Full-time",
    deskripsi: {
      id: "Mengembangkan dan memelihara aplikasi web menggunakan teknologi modern seperti React.js, Node.js, dan PostgreSQL. Bertanggung jawab dalam merancang arsitektur sistem, mengoptimalkan performa aplikasi, dan berkolaborasi dengan tim lintas fungsi.",
      en: "Developing and maintaining web applications using modern technologies such as React.js, Node.js, and PostgreSQL. Responsible for designing system architecture, optimizing application performance, and collaborating with cross-functional teams."
    },
    tanggungJawab: {
      id: [
        "Mengembangkan aplikasi web full-stack menggunakan React.js dan Node.js",
        "Merancang dan mengimplementasikan RESTful API",
        "Mengoptimalkan performa database dan query SQL",
        "Melakukan code review dan mentoring junior developer",
        "Berkolaborasi dengan tim UI/UX untuk implementasi design system"
      ],
      en: [
        "Developing full-stack web applications using React.js and Node.js",
        "Designing and implementing RESTful APIs",
        "Optimizing database performance and SQL queries",
        "Conducting code reviews and mentoring junior developers",
        "Collaborating with UI/UX team for design system implementation"
      ]
    },
    teknologi: ["React.js", "Vue.js", "Express.js", "Node.js", "TypeScript", "JavaScript", "Tailwind", "PostgreSQL", "VSCode", "Figma", "Postman"],
    pencapaian: {
      id: [
        "Meningkatkan performa aplikasi hingga 40% melalui optimasi code",
        "Memimpin pengembangan fitur baru yang meningkatkan user engagement 25%",
        "Mengimplementasikan CI/CD pipeline yang mengurangi deployment time 60%"
      ],
      en: [
        "Improved application performance by 40% through code optimization",
        "Led development of new features that increased user engagement by 25%",
        "Implemented CI/CD pipeline that reduced deployment time by 60%"
      ]
    },
    logo: "./assets/companies/erno.jpg",
    warna: "#3B82F6",
    dad: "100"
  },
  {
  id: 2,
  posisi: {
    id: "FullStack Developer",
    en: "FullStack Developer"
  },
  perusahaan: "Myer Kreatif Vision Vibe",
  periode: "2024 - 2025",
  tanggalMulai: "2024-11",
  tanggalSelesai: "2025-01",
  lokasi: "Cibitung, Indonesia",
  tipe: "Contract",
  deskripsi: {
    id: "Berperan sebagai Full-Stack Developer dalam merancang, mengembangkan, dan mengoperasikan sistem pemesanan jasa fotografer MKVI. Bertanggung jawab atas pengembangan aplikasi, pengelolaan operasional digital, serta memastikan sistem berjalan stabil dan mendukung proses bisnis.",
    en: "Worked as a Full-Stack Developer responsible for designing, developing, and operating the MKVI photographer service booking system. Handled application development, digital operations management, and ensured system stability to support business processes."
  },
  tanggungJawab: {
    id: [
      "Merancang dan mengembangkan aplikasi pemesanan jasa fotografer berbasis web",
      "Mengimplementasikan sistem booking, jadwal fotografer, dan manajemen pesanan",
      "Mengelola dashboard admin untuk operasional layanan fotografi",
      "Melakukan maintenance, monitoring, dan perbaikan sistem secara berkala",
      "Mendukung operasional bisnis melalui sistem digital yang terintegrasi"
    ],
    en: [
      "Designed and developed a web-based photographer service booking application",
      "Implemented booking, photographer scheduling, and order management systems",
      "Managed admin dashboards to support photography service operations",
      "Performed system maintenance, monitoring, and continuous improvements",
      "Supported business operations through integrated digital systems"
    ]
  },
  teknologi: ["React.js", "Express.js", "Node.js", "MySQL", "Figma", "Postman", "TypeScript", "JavaScript", "Tailwind"],
  pencapaian: {
    id: [
      "Berhasil membangun dan menjalankan sistem pemesanan jasa fotografer secara end-to-end",
      "Meningkatkan efisiensi operasional dan pengelolaan jadwal fotografer",
      "Mendukung proses bisnis MKVI melalui sistem digital yang stabil dan terstruktur"
    ],
    en: [
      "Successfully built and operated an end-to-end photographer service booking system",
      "Improved operational efficiency and photographer schedule management",
      "Supported MKVI business processes through a stable and well-structured digital system"
    ]
  },
  logo: "./assets/companies/mkvi.jpg",
  warna: "#10B981",
  dad: "200"
},
  {
    id: 3,
    posisi: {
      id: "Operator Produksi",
      en: "Production Operator"
    },
    perusahaan: "PT Grafindo Mitra Semesta",
    periode: "2020 - 2021",
    tanggalMulai: "2020-02",
    tanggalSelesai: "2021-01",
    lokasi: "Cikarang, Indonesia",
    tipe: "Full-time",
    deskripsi: {
      id: "Bertanggung jawab dalam operasional produksi percetakan dan packaging. Mengoperasikan mesin produksi, melakukan quality control, dan memastikan target produksi tercapai sesuai standar kualitas.",
      en: "Responsible for printing and packaging production operations. Operating production machines, conducting quality control, and ensuring production targets are met according to quality standards."
    },
    tanggungJawab: {
      id: [
        "Mengoperasikan mesin produksi percetakan offset dan digital",
        "Melakukan quality control pada hasil produksi",
        "Memastikan target produksi harian tercapai",
        "Melakukan maintenance rutin pada mesin produksi",
        "Berkoordinasi dengan tim shift untuk kontinuitas produksi"
      ],
      en: [
        "Operating offset and digital printing production machines",
        "Conducting quality control on production results",
        "Ensuring daily production targets are met",
        "Performing routine maintenance on production machines",
        "Coordinating with shift teams for production continuity"
      ]
    },
    teknologi: ["Mesin Offset", "Digital Printing", "Quality Control Tools", "Production Planning"],
    pencapaian: {
      id: [
        "Mencapai target produksi 98% selama periode kerja",
        "Mengurangi waste material hingga 15% melalui optimasi proses",
      ],
      en: [
        "Achieved 98% production targets during work period",
        "Reduced material waste by up to 15% through process optimization",
      ]
    },
    logo: "./assets/companies/Grafindo.jpeg",
    warna: "#F59E0B",
    dad: "300"
  }
];