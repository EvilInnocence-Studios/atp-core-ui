import { ISettingContainer } from "@common/lib/setting/types";

export const coreSettings:ISettingContainer = {
    General: {
        Pagination: {
            defaultPageSize: {
                displayName: "Default Page Size",
                type: "integer",
                defaultValue: 12,
                description: "The default number of items per page for pagination.",
            },
            pageSizeOptions: {
                displayName: "Page Size Options",
                type: "string",
                defaultValue: "12,24,48,96",
                description: "Comma-separated list of options for page sizes.",
            },
        },
        AWS: {
            awsRegion: {
                displayName: "AWS Region",
                type: "string",
                defaultValue: "us-east-1",
                description: "The AWS region to use for API requests.",
            },
            mediaBucket: {
                displayName: "Media Bucket",
                type: "string",
                defaultValue: "my-media-bucket",
                description: "The S3 bucket name for storing media files.",
            },
        }
    }
}