export declare class MountedKindle {
    private kindle_mount_path;
    private debug;
    private kindle_clippings_subpath;
    private parser;
    private data_dir;
    constructor(kindle_mount_path: string, debug?: boolean);
    is_connected(): boolean;
    load_my_clippings(): void;
}
