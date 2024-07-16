// plugins.js
module.exports = ({ env }) => ({
  "import-export-entries": {
    enabled: true,
  },
  "duplicate-button": true,
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "smtp.gmail.com"),
        port: env("SMTP_PORT", 587),
        auth: {
          user: env("SMTP_USERNAME"),
          pass: env("SMTP_PASSWORD"),
        },
        // ... any custom nodemailer options
      },
      settings: {
        defaultFrom: "grorapid@gmail.com",
        defaultReplyTo: "grorapid@gmail.com",
      },
    },
  },
  tinymce: {
    enabled: true,
    config: {
      editor: {
        outputFormat: "html",
        editorConfig: {
          height: 500,
          menubar: false,
          relative_urls: false,
          remove_script_host: true,
          document_base_url: "https://content-staging.skollege.com",
          extended_valid_elements: "span, small",
          forced_root_block: "",
          //convert_urls: false,
          entity_encoding: "raw",
          plugins:
            "anchor autolink charmap  emoticons image link lists media  table visualblocks wordcount  mediaembed  editimage tableofcontents   typography code",
          toolbar:
            "undo redo | styles | bold italic forecolor backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        media table emoticons visualblocks|\
                        nonbreaking bullist numlist outdent indent | removeformat | code",
        },
      },
    },
  },
  // Step 1: Configure the redis connection
  // @see https://github.com/strapi-community/strapi-plugin-redis
  redis: {
    config: {
        connections: {
            default: {
                connection: {
                    host: '127.0.0.1',
                    port: 6379,
                    db: 0,
                },
                settings: {
                    debug: false,
                },
            },
        },
    },
  },
  // Step 2: Configure the redis cache plugin
  "rest-cache": {
    config: {
        provider: {
            name: "redis",
            options: {
                max: 32767,
                connection: "default",
            },
        },
        strategy: {
            
            enableEtagSupport: true,
            logs: true,
            clearRelatedCache: true,
            maxAge: 3600000,
            contentTypes: [
                // list of Content-Types UID to cache
                // "api::university.university",
                // "api::global.global",
                // "api::page.page",
                // {
                //     contentType: "api::university.university",
                //     maxAge: 3600000,
                //     hitpass: false,
                //     keys: {
                //         useQueryParams: false,
                //         useHeaders: ["accept-encoding"],
                //     },
                //     method: "GET",
                // }
            ],
        },
    },
  },

  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: env('AWS_ACCESS_KEY_ID'),
        secretAccessKey: env('AWS_ACCESS_SECRET'),
        region: env('AWS_REGION'),
        params: {
          // ACL: env('AWS_ACL', 'public-read'),
          // signedUrlExpires: env('AWS_SIGNED_URL_EXPIRES', 15 * 60),
          Bucket: env('AWS_BUCKET'),
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
