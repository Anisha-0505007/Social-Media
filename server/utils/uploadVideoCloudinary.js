import cloudinary from "./cloudinary.js"

const uploadVideoToCloudinary = async (buffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder:"video-folder"
            },
            { resource_type: "video" },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.secure_url);
                }
            }
        );
        uploadStream.end(buffer);
    });
}

export default uploadVideoToCloudinary;