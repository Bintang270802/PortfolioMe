// Project images
import lpkzenglobal from "/assets/proyek/lpkzenglobal.png";
import quisubs from "/assets/proyek/quisubs.png";
import videoubs from "/assets/proyek/videoubs.png";
import mkvi from "/assets/proyek/mkvi.png";
import rfidAttendance from "/assets/proyek/rfid.png";
import portfolio from "/assets/proyek/profile.jpeg";

import { PROJECT_STATUS, PLATFORMS } from './constants';

export const projects = [
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
    technologies: ["React.js", "TypeScript", "Bun.js", "Tailwind"],
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/Bintang270802",
    figmaUrl: "https://www.figma.com/design/lhmqavcA2vVMHwEkwkz3hS/Lpk-Zen-Global?node-id=0-1&t=kgSmoPlqeM6tcrxk-1",
    liveUrl: "https://lpkzenglobal.com/",
    year: "2025",
    platform: PLATFORMS.WEB,
    delay: 100,
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
    technologies: ["React Native", "Express.js", "Next.js", "Node.js", "MongoDB", "Tailwind"],
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://github.com/Bintang270802",
    figmaUrl: "https://www.figma.com/design/G42hjnOf6IJU4h2Mq5gYUT/Edukasi-Pembelajaran---UBS?node-id=0-1&t=kgSmoPlqeM6tcrxk-1",
    liveUrl: "https://quisubs-demo.com",
    year: "2025",
    platform: PLATFORMS.WEB,
    status: PROJECT_STATUS.DEVELOPMENT,
    delay: 200,
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
      id: "Video UBS merupakan aplikasi video pembelajaran berbasis Android dan Website yang dirancang sebagai media pembelajaran digital untuk mendukung proses belajar mengajar secara modern, interaktif, dan fleksibel. Aplikasi ini bertujuan untuk memudahkan pengguna dalam mengakses materi pembelajaran berbentuk video kapan saja dan di mana saja Aplikasi ini juga dilengkapi dengan dashboard admin berbasis full CRUD, yang memungkinkan pengelola untuk menambahkan, mengubah, menghapus, dan mengelola data video, kategori materi, serta informasi pendukung pembelajaran secara terpusat. Hal ini memudahkan pengelolaan konten dan memastikan materi yang disajikan selalu актуал dan relevan.",
      en: "Video UBS is an Android and Website-based video learning application designed as digital learning media to support modern, interactive, and flexible teaching and learning processes. This application aims to make it easier for users to access video-based learning materials anytime and anywhere. The application is also equipped with a full CRUD-based admin dashboard, which allows managers to add, modify, delete, and manage video data, material categories, and learning support information centrally. This facilitates content management and ensures that the materials presented are always current and relevant."
    },
    technologies: ["PHP", "Laravel", "PHPMyAdmin", "JavaScript", "React Native"],
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/Bintang270802",
    figmaUrl: "https://www.figma.com/design/1k285ILp5kIA3qqmoaeWUX/Proyek-UBS?node-id=0-1&t=rdJ6vasXzsIr0wlQ-1",
    liveUrl: "https://videoubs-demo.com",
    year: "2025",
    status: PROJECT_STATUS.DEVELOPMENT,
    delay: 300,
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
    technologies: ["CodeIgniter", "PHP", "MySQL", "RFID"],
    borderColor: "#EF4444",
    gradient: "linear-gradient(145deg, #EF4444, #000)",
    url: "https://github.com/Bintang270802",
    figmaUrl: "https://www.figma.com/design/hQ4o6Q7yxD6KuQnwlkllIT/Smp-Ulil-Albab?node-id=0-1&t=xeE4tfhR98uccZ0I-1",
    liveUrl: "https://ulilalbab.sch.id/",
    year: "2025",
    platform: PLATFORMS.WEB,
    delay: 400,
  },
  {
    id: 5,
    image: portfolio,
    title: {
      id: "Portfolio",
      en: "Portfoliome"
    },
    subtitle: {
      id: "Full-Stack Developer dengan dasar kuat pada frontend, backend, dan sistem informasi berbasis web.",
      en: "Full-Stack Developer with a strong foundation in frontend, backend, and web-based information systems."
    },
    fullDescription: {
      id: "Full-Stack Developer dengan dasar yang kuat pada pengembangan frontend, backend, dan sistem informasi berbasis web. Saya memiliki pengalaman dalam merancang, mengembangkan, dan mengimplementasikan aplikasi web dengan menggabungkan antarmuka pengguna yang bersih serta logika backend yang andal. Saya terbiasa melakukan analisis kebutuhan sistem, perancangan arsitektur aplikasi, serta mengimplementasikan desain UI/UX menjadi aplikasi web yang fungsional dan responsif | Saya memahami alur kerja pengembangan web modern, penggunaan version control dengan Git dan GitHub, serta praktik kerja kolaboratif dalam tim. Ketertarikan pada UI/UX design membantu saya menjembatani kebutuhan desain dan teknis, sehingga solusi yang dihasilkan berfokus pada pengguna. Saya memiliki karakter teliti, adaptif, dan berkomitmen untuk terus belajar serta membangun solusi web yang efisien, scalable, dan berkelanjutan.",
      en: "Full-Stack Developer with a strong foundation in frontend, backend, and web-based information systems. I have hands-on experience in designing, developing, and implementing web applications by combining clean user interfaces with reliable backend logic. My work involves analyzing system requirements, designing application architecture, and translating UI/UX designs into functional and responsive web solutions | I am familiar with modern web development workflows, version control using Git and GitHub, and collaborative development practices. I also have a strong interest in UI/UX design, allowing me to bridge the gap between design and development to deliver user-centered digital products. Detail-oriented, adaptable, and continuously learning, I am committed to building efficient, scalable, and sustainable web-based solutions."
    },
    technologies: ["React.js", "JavaScript", "Supabase", "PostgreSQL"],
    borderColor: "#8B5CF6",
    gradient: "linear-gradient(145deg, #8B5CF6, #000)",
    url: "https://github.com/Bintang270802",
    figmaUrl: "https://www.figma.com/design/FyuIArWqUblabRG2UqBmUq/Portfoliome?t=fUZsyG9dzBlDFjDZ-1",
    liveUrl: "https://bintangdev.vercel.app/",
    year: "2026",
    platform: PLATFORMS.WEB,
    status: PROJECT_STATUS.NEW,
    delay: 500,
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
    technologies: ["TypeScript", "MySQL", "Express.js", "Next.js", "Node.js", "Tailwind"],
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://github.com/Bintang270802",
    figmaUrl: "https://www.figma.com/design/s6260cTlu5lJeZXNh6Iel1/mkvi?node-id=0-1&t=TggySZoA4WxLgcMJ-1",
    liveUrl: "https://portfolio-me-bintang.vercel.app/",
    year: "2024",
    platform: PLATFORMS.WEB,
    status: PROJECT_STATUS.DEVELOPMENT,
    delay: 600,
  },
];
