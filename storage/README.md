# Storage Directory

This directory contains Claude Skills files, documentation, and prompts for customer downloads.

## Structure

```
storage/
├── skills/          # .skill files (Claude Skills packages)
├── documentation/   # PDF documentation and guides
└── prompts/         # Standalone prompt text files
```

## File Naming Convention

All files should be named using the **product ID**:

- Skills: `{productId}.skill`
- Documentation: `{productId}.pdf`
- Prompts: `{productId}.txt`

Example:
- `prod_script_analysis.skill`
- `prod_script_analysis.pdf`
- `prod_script_analysis.txt`

## Security

- ⚠️ **Never commit actual customer files to git**
- Files are served via signed URLs with 7-day expiration
- Download attempts are rate-limited and logged
- Files should be encrypted at rest in production

## Adding Files

### Option 1: Manual Upload (Development)

1. Place files in the appropriate directory
2. Ensure filename matches product ID
3. Test download link generation

### Option 2: Admin Interface (Coming Soon)

Upload files through the admin panel at `/admin/products`

## File Requirements

### .skill Files
- Valid Claude Skills JSON format
- Tested and functional
- Include version information
- Max size: 10MB

### Documentation (PDF)
- Installation instructions
- Usage guide
- Examples and best practices
- Troubleshooting
- Support contact information
- Max size: 20MB

### Prompts (TXT)
- Plain text format
- UTF-8 encoding
- Clear instructions
- Example usage
- Max size: 100KB

## Production Considerations

For production environments, consider:

1. **External Storage**: AWS S3, Google Cloud Storage, or Azure Blob Storage
2. **CDN**: CloudFront, Cloudflare, or similar for faster downloads
3. **Encryption**: Encrypt files at rest
4. **Backup**: Regular automated backups
5. **Monitoring**: Track storage usage and download metrics

## Example: S3 Integration

```typescript
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: "us-east-1" });

async function generateS3DownloadUrl(productId: string, fileType: string) {
  const key = `skills/${productId}.${fileType}`;
  const command = new GetObjectCommand({
    Bucket: "aestruct-skills",
    Key: key,
  });

  return await getSignedUrl(s3, command, { expiresIn: 7 * 24 * 60 * 60 });
}
```

## Monitoring

Download logs are stored in the database (`download_logs` table):
- Order ID
- File type
- IP address
- Timestamp

Query recent downloads:
```sql
SELECT * FROM download_logs
ORDER BY downloaded_at DESC
LIMIT 100;
```
