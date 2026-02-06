/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_API_VERSION: string;
    readonly VITE_CLOUDINARY_CLOUD_NAME: string;
    readonly VITE_GOOGLE_MAPS_API_KEY: string;
    // Ajouter d'autres variables d'environnement ici
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
