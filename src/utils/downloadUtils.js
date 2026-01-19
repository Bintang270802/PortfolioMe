// Download utilities for certificates and files

export const downloadFile = async (url, filename, onProgress = null) => {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentLength = response.headers.get('content-length');
    const total = parseInt(contentLength, 10);
    let loaded = 0;

    const reader = response.body.getReader();
    const chunks = [];

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;
      
      chunks.push(value);
      loaded += value.length;
      
      if (onProgress && total) {
        onProgress(Math.round((loaded / total) * 100));
      }
    }

    const blob = new Blob(chunks);
    const downloadUrl = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    window.URL.revokeObjectURL(downloadUrl);
    
    return { success: true };
  } catch (error) {
    console.error('Download failed:', error);
    return { success: false, error: error.message };
  }
};

export const downloadCertificate = async (certificate, onProgress = null, onSuccess = null, onError = null) => {
  try {
    // Generate filename from certificate name
    const filename = `${certificate.nama.id || certificate.nama}_${certificate.penerbit}_${certificate.tanggal}.jpg`
      .replace(/[^a-z0-9]/gi, '_')
      .replace(/_+/g, '_')
      .toLowerCase();

    const result = await downloadFile(certificate.gambar, filename, onProgress);
    
    if (result.success) {
      if (onSuccess) {
        onSuccess(certificate, filename);
      }
      return { success: true, filename };
    } else {
      if (onError) {
        onError(certificate, result.error);
      }
      return { success: false, error: result.error };
    }
  } catch (error) {
    if (onError) {
      onError(certificate, error.message);
    }
    return { success: false, error: error.message };
  }
};

export const downloadMultipleCertificates = async (certificates, onProgress = null, onComplete = null) => {
  const results = [];
  const total = certificates.length;
  
  for (let i = 0; i < certificates.length; i++) {
    const certificate = certificates[i];
    
    try {
      const result = await downloadCertificate(
        certificate,
        (progress) => {
          if (onProgress) {
            const overallProgress = Math.round(((i + (progress / 100)) / total) * 100);
            onProgress(overallProgress, i + 1, total, certificate);
          }
        }
      );
      
      results.push({ certificate, ...result });
      
      // Small delay between downloads to prevent overwhelming the browser
      if (i < certificates.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      results.push({ 
        certificate, 
        success: false, 
        error: error.message 
      });
    }
  }
  
  if (onComplete) {
    onComplete(results);
  }
  
  return results;
};

export const generateCertificateZip = async (certificates, onProgress = null) => {
  // This would require a zip library like JSZip
  // For now, we'll download them individually
  return downloadMultipleCertificates(certificates, onProgress);
};

export const validateImageUrl = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok && response.headers.get('content-type')?.startsWith('image/');
  } catch {
    return false;
  }
};

export const getFileSize = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentLength = response.headers.get('content-length');
    return contentLength ? parseInt(contentLength, 10) : null;
  } catch {
    return null;
  }
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};