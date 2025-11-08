export const uploadToMinIO = async (file, path) => {
    try {

        const formData = new FormData();
        formData.append("file", file);
        formData.append("path", path);

        const res = await fetch("/api/minio-upload", {
            method: "POST",
            body: formData, // ✅ Do NOT set headers, browser sets automatically
        });

        const data = await res.json();

        if (!res.ok) {
            console.error("❌ MinIO upload failed:", data);
            return null;
        }

        console.log("✅ MinIO Upload Success:", data.url);
        return data.url;
    } catch (err) {
        console.error("🔥 MinIO Upload Error:", err);
        return null;
    }
};
