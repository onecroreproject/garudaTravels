export const uploadToMinIO = async (file, path) => {
    try{
    const formData = new FormData();
    formData.append("file", file);
    formData.append("path", path); // we will support folders next

    const res = await fetch("/api/minio-upload", {
        method: "POST",
        body: formData,
    });

    console.log("MinIO upload response:", res);
    const data = await res.json();
    if (!res.ok) {
        console.error("MinIO upload failed:", data);
        return null;
    }

    return data.url; // public file URL
    }catch(err){
        console.error("Error uploading to MinIO:", err);
        return null;
    }
};
