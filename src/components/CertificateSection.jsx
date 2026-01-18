import CertificateCard from './CertificateCard';

const CertificateSection = ({ certificates, title, subtitle }) => {
  return (
    <div className="certificates">
      {/* Header */}
      <div className="text-center mb-12 sm:mb-16" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
          {subtitle}
        </p>
      </div>
      
      {/* Certificate Grid */}
      <div className="certificates-box grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">
        {certificates.map((sertifikat) => (
          <CertificateCard key={sertifikat.id} sertifikat={sertifikat} />
        ))}
      </div>
    </div>
  );
};

export default CertificateSection;