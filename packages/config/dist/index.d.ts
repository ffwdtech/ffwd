export declare const FILE_NAME = "ffwd.json";
export declare let configLocation: string;
export declare function getConfig(): {
    dataDir: string;
    bigIntMode?: "string" | "number" | "bigint" | undefined;
    pgConfig: any;
} & {
    location: string;
};
export declare function getAllDirectories(): {
    extensions: string;
    migrations: string;
    relations: string;
    schemas: string;
    seeds: string;
};
export declare function getDataDir(type: string): string;
export declare function getDataRootDir(): string;
//# sourceMappingURL=index.d.ts.map