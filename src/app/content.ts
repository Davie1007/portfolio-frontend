/* ─── Site identity ─────────────────────────────────────────── */

export const SITE = {
  name: 'David Karanja',
  role: 'Creative Developer & Systems Engineer',
  location: 'Thika, Kenya',
  coordinates: `THIKA — 01° 02' 18.00" S — 37° 04' 04.00" E`,
  email: 'hello@karanjadavid.com',
  linkedin: 'https://linkedin.com/in/david-karanja',
  github: 'https://github.com/david-karanja',
  resume: '/resume.pdf',
  apiUrl: '',
  heroShot: '/assets/hero.webp',
  heroShotAlt: 'Creator Studio 3D editor',
};

/* ─── Navigation ─────────────────────────────────────────────── */

export const NAV = [
  { label: 'PROJECTS', href: '/' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CONTACTS', href: '/contacts' },
];

/* ─── Tech Stack for About ──────────────────────────────────── */

export interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | '3d' | 'infra';
  url: string;
}

export const TECH_STACK: TechItem[] = [
  { name: 'Angular', category: 'frontend', url: 'https://angular.dev' },
  { name: 'TypeScript', category: 'frontend', url: 'https://www.typescriptlang.org' },
  { name: 'Three.js', category: '3d', url: 'https://threejs.org' },
  { name: 'WebGL', category: '3d', url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API' },
  { name: 'React', category: 'frontend', url: 'https://react.dev' },
  { name: 'Tailwind CSS', category: 'frontend', url: 'https://tailwindcss.com' },
  { name: 'Laravel', category: 'backend', url: 'https://laravel.com' },
  { name: 'PHP 8.5', category: 'backend', url: 'https://www.php.net' },
  { name: 'PostgreSQL', category: 'backend', url: 'https://www.postgresql.org' },
  { name: 'Redis', category: 'backend', url: 'https://redis.io' },
  { name: 'Docker', category: 'infra', url: 'https://www.docker.com' },
  { name: 'Linux / Nginx', category: 'infra', url: 'https://ubuntu.com' },
  { name: 'Safaricom Cloud / AWS', category: 'infra', url: 'https://aws.amazon.com' },
  { name: 'Figma', category: 'frontend', url: 'https://www.figma.com' },
  { name: 'Git & GitHub Actions', category: 'infra', url: 'https://github.com' },
];

/* ─── About page content ─────────────────────────────────────── */

export const ABOUT = {
  heading: 'Hey.',
  subheading: "I'm a full-stack engineer and creative developer who crafts web applications and business systems where architecture, performance, and design work as one.",
  bio: [
    "I'm David Karanja, a software engineer based in Thika, Kenya. With a background in Mathematics and Computer Science, I bridge the space between low-level business logic, robust database design, and interactive 3D web interfaces.",
    "Most engineering hours go into the foundations nobody sees — state transitions, database indexes, schema invariants, and things that get deliberately cut. What ships is what survives that rigorous filter.",
    "I handle design and engineering together, which means faster decisions, zero translation loss between Figma and production code, and software that stays lightning fast under real-world data loads.",
  ],
  principles: [
    {
      title: 'Decisions & Tradeoffs',
      text: 'What you leave out is as important as what you put in. Every component and query must justify its existence with measurable business value.',
    },
    {
      title: 'Explicit State Modeling',
      text: 'Every order, transaction, or user flow follows a strict mathematical state machine. No record ever lands in an unplanned, orphaned state.',
    },
    {
      title: 'Invariants in Tests',
      text: 'Invariants must never break: inventory is never negative, payments always match ledger balances, and 3D scenes stay pinned at 60 FPS.',
    },
    {
      title: 'Performance by Design',
      text: 'Systems are architected from day one for sub-50ms database responses, clean bundle splits, and optimized WebGL draw calls.',
    },
  ],
  facts: [
    { label: 'Based in', value: 'Thika, Kenya' },
    { label: 'Studied', value: 'BSc Mathematics & Computer Science' },
    { label: 'Focus', value: 'Business Systems · ERP · Interactive 3D' },
    { label: 'Coordinates', value: `01° 02' 18" S · 37° 04' 04" E` },
  ],
  links: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/david-karanja' },
    { label: 'GitHub', href: 'https://github.com/david-karanja' },
    { label: 'Resume', href: '/resume.pdf' },
  ],
};

/* ─── Rich Project Case Studies (Daniele Buser Blueprint) ──── */

export interface TreeNode {
  name: string;
  type: 'folder' | 'file';
  expanded?: boolean;
  children?: TreeNode[];
}

export interface ProjectCaseStudy {
  slug: string;
  title: string;
  year: string;
  category: string;
  tags: string[];
  image: string;
  imageAlt: string;
  summary: string;
  href?: string;
  githubUrl?: string;
  obsess: {
    headline: string;
    paragraphs: string[];
  };
  design: {
    palette: { name: string; hex: string; rgb: string; pms: string }[];
    typefaces: { name: string; category: string; weights: string[]; sample: string }[];
    componentsSummary: string;
    interactiveDemoTitle: string;
    interactiveDemoDescription: string;
  };
  code: {
    technologies: { name: string; url: string; note: string }[];
    architecture: TreeNode[];
    implementation: {
      filename: string;
      language: string;
      code: string;
    }[];
  };
  ship: {
    sections: { title: string; text: string; image?: string }[];
  };
}

export const CASE_STUDIES: ProjectCaseStudy[] = [
  {
    slug: 'creator-studio',
    title: 'T-Shirt Creator Studio',
    year: '2026',
    category: 'Interactive 3D / WebGL',
    tags: ['Three.js', 'React', 'WebGL', 'Laravel', 'Tailwind'],
    image: '/assets/Custom_T-Shirt_Online.webp',
    imageAlt: 'Creator Studio 3D editor with a product on a turntable',
    summary: 'Print-on-demand design studio where customers customize apparel in interactive 3D with realistic fabric texture mapping and automated Printify production fulfillment.',
    href: 'https://create.karanjadavid.com',
    githubUrl: 'https://github.com/david-karanja/creator-studio',
    obsess: {
      headline: 'Interactive 3D Web Commerce',
      paragraphs: [
        'E-commerce apparel customization typically relies on flat 2D previews that fail to convey realistic garment drape, texture relief, or print placement under variable lighting.',
        'Creator Studio delivers an interactive 3D turntable configurator directly in the browser with real-time UV texture baking, decal manipulation, dynamic specular maps, and instant mock generation.',
        'The front-end utilizes Three.js with custom GLSL displacement shaders, while the Laravel backend orchestrates print-ready high-resolution CMYK exports and dispatches orders straight to the Printify API.',
      ],
    },
    design: {
      palette: [
        { name: 'Pitch Black', hex: '#0a0a0a', rgb: '10 10 10', pms: 'Black 6 C' },
        { name: 'Dark Charcoal', hex: '#1c1c1e', rgb: '28 28 30', pms: 'Neutral Black C' },
        { name: 'Fabric Gray', hex: '#636366', rgb: '99 99 102', pms: 'Cool Gray 9 C' },
        { name: 'Accent Lime', hex: '#d4ff00', rgb: '212 255 0', pms: 'Bright Yellow C' },
        { name: 'Pure Chalk', hex: '#f2f2f7', rgb: '242 242 247', pms: '7541 C' },
      ],
      typefaces: [
        { name: 'Space Grotesk', category: 'sans', weights: ['Light 300', 'Regular 400', 'Bold 700'], sample: 'Aa' },
        { name: 'JetBrains Mono', category: 'mono', weights: ['Thin 100', 'Book 400', 'Bold 700'], sample: 'Aa' },
      ],
      componentsSummary: 'Modular 3D transform gizmos, layer reordering stack, color picker swatches, and high-DPI export canvas preview.',
      interactiveDemoTitle: 'Real-time UV Decal Projection',
      interactiveDemoDescription: 'Drag and rotate decals across a 3D garment mesh with real-time normal lighting and bump calculations.',
    },
    code: {
      technologies: [
        { name: 'Three.js', url: 'https://threejs.org', note: 'WebGL rendering engine, orbit controls, custom materials' },
        { name: 'React', url: 'https://react.dev', note: 'UI state tree and customization options dispatch' },
        { name: 'Laravel 12', url: 'https://laravel.com', note: 'Asset upload pipeline and Printify webhooks' },
        { name: 'Tailwind CSS', url: 'https://tailwindcss.com', note: 'Clean brutalist studio interface' },
      ],
      architecture: [
        {
          name: 'src/',
          type: 'folder',
          expanded: true,
          children: [
            {
              name: 'canvas/',
              type: 'folder',
              expanded: true,
              children: [
                { name: 'ShirtModel.tsx', type: 'file' },
                { name: 'DecalProjector.tsx', type: 'file' },
                { name: 'LightingRig.tsx', type: 'file' },
              ],
            },
            {
              name: 'components/',
              type: 'folder',
              children: [
                { name: 'ColorPicker.tsx', type: 'file' },
                { name: 'LayerManager.tsx', type: 'file' },
                { name: 'ExportModal.tsx', type: 'file' },
              ],
            },
            {
              name: 'hooks/',
              type: 'folder',
              children: [
                { name: 'useTextureLoader.ts', type: 'file' },
                { name: 'usePrintifySync.ts', type: 'file' },
              ],
            },
          ],
        },
      ],
      implementation: [
        {
          filename: 'ShirtModel.tsx',
          language: 'typescript',
          code: `import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function ShirtModel({ color, decalTexture }: { color: string; decalTexture: THREE.Texture }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { nodes, materials } = useGLTF('/models/tshirt.glb') as any;

  return (
    <group dispose={null}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={nodes.T_Shirt.geometry}
        material={materials.lambert1}
        material-color={color}
        material-roughness={0.65}
      >
        {decalTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={[0.22, 0.22, 0.22]}
            map={decalTexture}
          />
        )}
      </mesh>
    </group>
  );
}`,
        },
        {
          filename: 'DecalProjector.tsx',
          language: 'typescript',
          code: `import { Decal } from '@react-three/drei';
import * as THREE from 'three';

export function DecalProjector({ texture, position, scale }: {
  texture: THREE.Texture;
  position: [number, number, number];
  scale: [number, number, number];
}) {
  return (
    <Decal
      position={position}
      rotation={[0, 0, 0]}
      scale={scale}
      map={texture}
      depthTest={true}
      depthWrite={false}
      polygonOffset
      polygonOffsetFactor={-4}
    />
  );
}`,
        },
      ],
    },
    ship: {
      sections: [
        {
          title: 'Infrastructure & CDN',
          text: 'The 3D frontend is deployed on high-speed global edge networks with compressed Draco 3D geometry and WebP textures for sub-second loading.',
        },
        {
          title: 'Printify Automated Pipeline',
          text: 'When a customer places an order, the Laravel backend generates 300 DPI print-ready production files and dispatches orders with automatic tracking.',
        },
      ],
    },
  },
  {
    slug: 'multi-tenant-erp',
    title: 'Multi-Tenant Dolibarr ERP',
    year: '2026',
    category: 'Enterprise & Cloud Systems',
    tags: ['Dolibarr', 'Linux', 'Safaricom Cloud', 'MySQL', 'Nginx'],
    image: '/assets/erp.jpeg',
    imageAlt: 'Dolibarr ERP dashboard showing isolated inventory and financial ledgers',
    summary: 'Cloud-hosted multi-tenant Dolibarr ERP architecture supporting independent small and medium businesses with isolated databases, automated backups, and unified reporting.',
    githubUrl: 'https://github.com/david-karanja/multi-tenant-dolibarr',
    obsess: {
      headline: 'Isolated Multi-Tenancy for East African Enterprises',
      paragraphs: [
        'Mid-sized retail and service enterprises often struggle with bloated, expensive ERP software. Running separate server instances for multiple clients inflates infrastructure overhead exponentially.',
        'This deployment establishes a high-density, multi-tenant Dolibarr architecture on Safaricom Cloud infrastructure. Each tenant receives a strictly isolated MySQL database and storage volume, while sharing an optimized PHP 8.5 / Nginx runtime.',
        'Includes automated tenant provisioning scripts, hourly snapshot backups to offsite S3 buckets, and custom localized modules for Kenyan tax compliance (eTIMS) and M-Pesa billing.',
      ],
    },
    design: {
      palette: [
        { name: 'Console Black', hex: '#0a0a0a', rgb: '10 10 10', pms: 'Black 6 C' },
        { name: 'Cloud Slate', hex: '#24292e', rgb: '36 41 46', pms: '432 C' },
        { name: 'Signal Green', hex: '#00d084', rgb: '0 208 132', pms: '7487 C' },
        { name: 'Border Gray', hex: '#e1e4e8', rgb: '225 228 232', pms: 'Cool Gray 1 C' },
        { name: 'Clean White', hex: '#ffffff', rgb: '255 255 255', pms: 'White C' },
      ],
      typefaces: [
        { name: 'Space Grotesk', category: 'sans', weights: ['Regular 400', 'Semibold 600'], sample: 'Aa' },
        { name: 'JetBrains Mono', category: 'mono', weights: ['Book 400', 'Bold 700'], sample: 'Aa' },
      ],
      componentsSummary: 'Tenant selector switcher, ledger audit trail table, automated cron status indicators, and encrypted credential vault.',
      interactiveDemoTitle: 'Tenant Database Isolation Engine',
      interactiveDemoDescription: 'Dynamic Nginx server block routing and sub-database connection pool switcher based on tenant subdomain headers.',
    },
    code: {
      technologies: [
        { name: 'Dolibarr Core', url: 'https://www.dolibarr.org', note: 'Open-source modular ERP/CRM framework' },
        { name: 'Safaricom Cloud', url: 'https://business.safaricom.co.ke', note: 'Low-latency regional cloud hosting' },
        { name: 'Nginx & PHP-FPM', url: 'https://nginx.org', note: 'Dynamic reverse proxy & pool multiplexer' },
        { name: 'Bash & Python', url: 'https://python.org', note: 'Automated provisioning and backup automation' },
      ],
      architecture: [
        {
          name: 'deploy/',
          type: 'folder',
          expanded: true,
          children: [
            {
              name: 'provision/',
              type: 'folder',
              expanded: true,
              children: [
                { name: 'create_tenant.sh', type: 'file' },
                { name: 'migrate_all.py', type: 'file' },
                { name: 'backup_s3.sh', type: 'file' },
              ],
            },
            {
              name: 'nginx/',
              type: 'folder',
              children: [
                { name: 'multitenant.conf', type: 'file' },
                { name: 'ssl_params.conf', type: 'file' },
              ],
            },
            {
              name: 'custom_modules/',
              type: 'folder',
              children: [
                { name: 'etims_kenya/', type: 'folder' },
                { name: 'daraja_payments/', type: 'folder' },
              ],
            },
          ],
        },
      ],
      implementation: [
        {
          filename: 'create_tenant.sh',
          language: 'bash',
          code: `#!/usr/bin/env bash
set -euo pipefail

TENANT_ID="$1"
DB_NAME="doli_\${TENANT_ID}"
TENANT_DOCS="/var/dolibarr/documents/\${TENANT_ID}"

echo ">> Provisioning tenant: \${TENANT_ID}"
mysql -u root -p\${MYSQL_ROOT_PW} -e "CREATE DATABASE IF NOT EXISTS \${DB_NAME} CHARACTER SET utf8mb4;"
mkdir -p "\${TENANT_DOCS}"
chown -R www-data:www-data "\${TENANT_DOCS}"

# Generate isolated config.php
cat <<EOF > "/var/www/dolibarr/conf/conf_\${TENANT_ID}.php"
<?php
\\$dolibarr_main_url_root = 'https://\${TENANT_ID}.erp.karanjadavid.com';
\\$dolibarr_main_document_root = '/var/www/dolibarr/htdocs';
\\$dolibarr_main_data_root = '\${TENANT_DOCS}';
\\$dolibarr_main_db_name = '\${DB_NAME}';
EOF

echo ">> Tenant \${TENANT_ID} configured successfully."`,
        },
      ],
    },
    ship: {
      sections: [
        {
          title: 'Safaricom Cloud VPC',
          text: 'Hosted on dedicated virtual private cloud servers in Nairobi, ensuring round-trip ping times under 15ms across Kenya.',
        },
        {
          title: 'Encrypted S3 Backups',
          text: 'Tenant databases are dumped and encrypted with GPG every 6 hours and streamed to offsite immutable cloud storage.',
        },
      ],
    },
  },
  {
    slug: 'logistics-tracker',
    title: 'B2B Logistics & Delivery Tracker',
    year: '2026',
    category: 'Real-time Operations Platform',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Google Maps API', 'WebSockets'],
    image: '/assets/logistics.jpg',
    imageAlt: 'Map interface with live delivery truck overlays and dispatch queues',
    summary: 'A real-time dispatch dashboard for regional freight distributors managing fleet routing, driver assignments, geofence triggers, and automated customer SMS status updates.',
    githubUrl: 'https://github.com/david-karanja/b2b-logistics-tracker',
    obsess: {
      headline: 'Real-Time Visibility for Last-Mile Distribution',
      paragraphs: [
        'Fleet managers often lose hours manually calling drivers for ETAs and dispatch statuses. Delays compound quickly across multiple drop-off destinations without live telemetry.',
        'This platform provides real-time GPS fleet tracking on top of Google Maps with custom clustered waypoint overlays, trip milestones, and automated status transitions.',
        'When a delivery vehicle breaches a pre-configured geofence perimeter, the Node.js event engine automatically sends localized SMS notifications to warehouse receivers and recalculates delivery time windows.',
      ],
    },
    design: {
      palette: [
        { name: 'Onyx Night', hex: '#0f172a', rgb: '15 23 42', pms: '2965 C' },
        { name: 'Radar Amber', hex: '#f59e0b', rgb: '245 158 11', pms: '137 C' },
        { name: 'Success Teal', hex: '#10b981', rgb: '16 185 129', pms: '7723 C' },
        { name: 'Border Slate', hex: '#334155', rgb: '51 65 85', pms: '7546 C' },
        { name: 'Pure Chalk', hex: '#f8fafc', rgb: '248 250 252', pms: '663 C' },
      ],
      typefaces: [
        { name: 'Space Grotesk', category: 'sans', weights: ['Regular 400', 'Bold 700'], sample: 'Aa' },
        { name: 'JetBrains Mono', category: 'mono', weights: ['Book 400', 'Bold 700'], sample: 'Aa' },
      ],
      componentsSummary: 'Live map canvas, vehicle telemetry side drawer, route leg optimization checklist, and driver communication logs.',
      interactiveDemoTitle: 'WebSocket Telemetry Stream',
      interactiveDemoDescription: 'Broadcasts low-latency driver GPS coordinate packets with dead-reckoning smoothing between polling pings.',
    },
    code: {
      technologies: [
        { name: 'Google Maps API', url: 'https://developers.google.com/maps', note: 'Custom vector map layers, directions service' },
        { name: 'Node.js & WebSockets', url: 'https://nodejs.org', note: 'Bi-directional live vehicle telemetry pipeline' },
        { name: 'PostgreSQL & PostGIS', url: 'https://postgis.net', note: 'Spatial queries, polygon geofence intersection' },
        { name: 'Africa’s Talking SMS', url: 'https://africastalking.com', note: 'High-deliverability customer dispatch alerts' },
      ],
      architecture: [
        {
          name: 'server/',
          type: 'folder',
          expanded: true,
          children: [
            {
              name: 'telemetry/',
              type: 'folder',
              expanded: true,
              children: [
                { name: 'socketHandler.ts', type: 'file' },
                { name: 'geofenceDetector.ts', type: 'file' },
              ],
            },
            {
              name: 'services/',
              type: 'folder',
              children: [
                { name: 'smsNotifier.ts', type: 'file' },
                { name: 'routeOptimizer.ts', type: 'file' },
              ],
            },
          ],
        },
      ],
      implementation: [
        {
          filename: 'geofenceDetector.ts',
          language: 'typescript',
          code: `import { pool } from '../db';

export async function checkGeofenceEntry(vehicleId: string, lat: number, lng: number) {
  const query = \`
    SELECT id, order_id, name
    FROM geofences
    WHERE ST_Contains(geom, ST_SetSRID(ST_MakePoint($1, $2), 4326))
      AND is_active = true;
  \`;
  const res = await pool.query(query, [lng, lat]);
  if (res.rows.length > 0) {
    for (const geofence of res.rows) {
      await triggerArrivalWebhook(geofence.order_id, vehicleId);
    }
  }
}`,
        },
      ],
    },
    ship: {
      sections: [
        {
          title: 'High-Frequency PostGIS Ingestion',
          text: 'Engineered to comfortably handle over 200 telemetry ticks per second with batch insertion and index spatial partitioning.',
        },
        {
          title: '99.9% Uptime Deployment',
          text: 'Containerized using Docker Compose with automated health checks, managed PostgreSQL failover, and Redis pub/sub message brokers.',
        },
      ],
    },
  },
  {
    slug: 'mpesa-reconciliation',
    title: 'M-Pesa Automated Reconciliation Engine',
    year: '2026',
    category: 'Fintech & Automated Accounting',
    tags: ['Laravel', 'MySQL', 'Redis', 'Daraja API', 'Cron Jobs'],
    image: '/assets/mpesa.jpeg',
    imageAlt: 'Financial ledger matching transactions automatically with zero human intervention',
    summary: 'A custom financial tool that fetches M-Pesa Daraja API statements, automatically matches payments to customer invoices, highlights discrepancies, and flags fraud anomalies.',
    githubUrl: 'https://github.com/david-karanja/mpesa-reconciliation',
    obsess: {
      headline: 'Eliminating Manual Financial Reconciliation Errors',
      paragraphs: [
        'High-volume businesses receiving hundreds of customer M-Pesa payments daily suffer from manual ledger entry errors, delayed order fulfillment, and fraudulent altered SMS receipts.',
        'This engine connects directly to Safaricom’s Daraja 2.0 C2B, B2C, and Transaction Query APIs to ingest and verify every mobile money transaction cryptographically in real time.',
        'Transactions are fuzzy-matched against pending ERP invoices using account numbers, phone hashes, and timestamp windows, automatically clearing orders and queuing unmatched payments for audited review.',
      ],
    },
    design: {
      palette: [
        { name: 'M-Pesa Emerald', hex: '#00833e', rgb: '0 131 62', pms: '348 C' },
        { name: 'Midnight Charcoal', hex: '#0e1117', rgb: '14 17 23', pms: 'Black C' },
        { name: 'Audit Amber', hex: '#eab308', rgb: '234 179 8', pms: '109 C' },
        { name: 'Ledger Gray', hex: '#4b5563', rgb: '75 85 99', pms: 'Cool Gray 10 C' },
        { name: 'Crisp White', hex: '#ffffff', rgb: '255 255 255', pms: 'White C' },
      ],
      typefaces: [
        { name: 'Space Grotesk', category: 'sans', weights: ['Regular 400', 'Semibold 600'], sample: 'Aa' },
        { name: 'JetBrains Mono', category: 'mono', weights: ['Book 400', 'Bold 700'], sample: 'Aa' },
      ],
      componentsSummary: 'Real-time ledger matcher, transaction receipt inspection drawer, manual resolution modal, and discrepancy alert stream.',
      interactiveDemoTitle: 'Automated Invariant Verification',
      interactiveDemoDescription: 'Enforces that payment amount matches invoice sum to the cent and prevents duplicate transaction ID submissions.',
    },
    code: {
      technologies: [
        { name: 'Safaricom Daraja API', url: 'https://developer.safaricom.co.ke', note: 'C2B / STK Push / Balance enquiry integration' },
        { name: 'Laravel 12', url: 'https://laravel.com', note: 'Queued transaction ingestion and reconciliation jobs' },
        { name: 'Redis', url: 'https://redis.io', note: 'Idempotency locking and rapid duplicate-check cache' },
        { name: 'MySQL', url: 'https://mysql.com', note: 'ACID-compliant double-entry ledger database' },
      ],
      architecture: [
        {
          name: 'app/',
          type: 'folder',
          expanded: true,
          children: [
            {
              name: 'Services/',
              type: 'folder',
              expanded: true,
              children: [
                { name: 'DarajaClient.php', type: 'file' },
                { name: 'ReconciliationMatcher.php', type: 'file' },
              ],
            },
            {
              name: 'Jobs/',
              type: 'folder',
              children: [
                { name: 'ProcessIncomingPayment.php', type: 'file' },
                { name: 'AuditLedgerDiscrepancy.php', type: 'file' },
              ],
            },
          ],
        },
      ],
      implementation: [
        {
          filename: 'ReconciliationMatcher.php',
          language: 'php',
          code: `<?php
namespace App\Services;

use App\Models\Invoice;
use App\Models\Payment;
use Illuminate\Support\Facades\DB;

class ReconciliationMatcher
{
    public function match(Payment $payment): bool
    {
        return DB::transaction(function () use ($payment) {
            $invoice = Invoice::where('account_reference', $payment->bill_ref_number)
                ->where('status', 'pending')
                ->lockForUpdate()
                ->first();

            if (! $invoice) {
                $payment->update(['status' => 'unmatched_review']);
                return false;
            }

            if ($payment->amount >= $invoice->amount_due) {
                $invoice->update(['status' => 'paid', 'paid_at' => now()]);
                $payment->update(['status' => 'reconciled', 'invoice_id' => $invoice->id]);
                return true;
            }

            $payment->update(['status' => 'partial_payment', 'invoice_id' => $invoice->id]);
            return true;
        });
    }
}`,
        },
      ],
    },
    ship: {
      sections: [
        {
          title: 'Zero Duplicate Guarantee',
          text: 'Leverages Redis distributed atomic locks on Transaction IDs to guarantee zero double-crediting even during concurrent webhook retries.',
        },
        {
          title: 'Audited Financial Compliance',
          text: 'Maintains an immutable append-only audit ledger with actor hashes for regulatory compliance and tax audit export.',
        },
      ],
    },
  },
  {
    slug: 'real-estate-3d',
    title: '3D Real Estate Virtual Tour Platform',
    year: '2026',
    category: 'Architectural Visualization & 3D Web',
    tags: ['React', 'Three.js', 'WebGL', 'AWS S3', 'Tailwind'],
    image: '/assets/real-estate.jpg',
    imageAlt: 'Interactive 3D apartment floor plan blueprint with customizable finishes',
    summary: 'An interactive web portal allowing luxury property buyers to explore customizable residential estate layouts, wall finishes, flooring materials, and daylight simulations in full 3D.',
    githubUrl: 'https://github.com/david-karanja/real-estate-3d-portal',
    obsess: {
      headline: 'Next-Generation Architectural Walkthroughs on the Web',
      paragraphs: [
        'Off-plan real estate sales rely heavily on static 3D renderings that fail to provide buyers an authentic feel of spatial relationships, day/night lighting, and finish customization.',
        'This portal brings complete architectural floor plans and interior spaces into the browser with real-time physical camera navigation, PBR material swappers, and sunlight vector simulation based on time of day.',
        'Engineered with LOD (Level of Detail) mesh streaming and texture atlas compression to run smoothly at 60 FPS on both mobile phones and desktop browsers without requiring heavy downloads.',
      ],
    },
    design: {
      palette: [
        { name: 'Architect Black', hex: '#111215', rgb: '17 18 21', pms: 'Black 7 C' },
        { name: 'Warm Terrazzo', hex: '#d1bfa7', rgb: '209 191 167', pms: '468 C' },
        { name: 'Blueprint Navy', hex: '#1e3a8a', rgb: '30 58 138', pms: '281 C' },
        { name: 'Concrete Gray', hex: '#9ca3af', rgb: '156 163 175', pms: 'Cool Gray 7 C' },
        { name: 'Alabaster', hex: '#fafafa', rgb: '250 250 250', pms: 'White C' },
      ],
      typefaces: [
        { name: 'Space Grotesk', category: 'sans', weights: ['Light 300', 'Regular 400', 'Bold 700'], sample: 'Aa' },
        { name: 'JetBrains Mono', category: 'mono', weights: ['Book 400', 'Bold 700'], sample: 'Aa' },
      ],
      componentsSummary: 'Sun angle daylight slider, floor selector ribbon, PBR material texture swatch tray, and camera bookmark viewports.',
      interactiveDemoTitle: 'Daylight Simulation Engine',
      interactiveDemoDescription: 'Calculates directional light vectors and ambient color temperature shifts to simulate sunlight from 06:00 to 19:00.',
    },
    code: {
      technologies: [
        { name: 'Three.js & WebGL', url: 'https://threejs.org', note: 'Physically based rendering (PBR), ambient occlusion' },
        { name: 'React', url: 'https://react.dev', note: 'Interactive camera viewport controls & material selector' },
        { name: 'AWS S3 & CloudFront', url: 'https://aws.amazon.com/s3', note: 'Optimized GLTF asset delivery with gzip/brotli' },
        { name: 'GLSL Shaders', url: 'https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language', note: 'Custom soft shadow and depth mapping' },
      ],
      architecture: [
        {
          name: 'src/',
          type: 'folder',
          expanded: true,
          children: [
            {
              name: 'scene/',
              type: 'folder',
              expanded: true,
              children: [
                { name: 'ApartmentScene.tsx', type: 'file' },
                { name: 'SunlightRig.tsx', type: 'file' },
                { name: 'MaterialSwapper.ts', type: 'file' },
              ],
            },
            {
              name: 'controls/',
              type: 'folder',
              children: [
                { name: 'FirstPersonWalk.ts', type: 'file' },
                { name: 'FloorplanOverview.tsx', type: 'file' },
              ],
            },
          ],
        },
      ],
      implementation: [
        {
          filename: 'SunlightRig.tsx',
          language: 'typescript',
          code: `import { useMemo } from 'react';
import * as THREE from 'three';

export function SunlightRig({ hourOfDay }: { hourOfDay: number }) {
  // Map hour (6 to 18) to sun angle arc
  const { position, intensity, color } = useMemo(() => {
    const angle = ((hourOfDay - 6) / 12) * Math.PI;
    const x = Math.cos(angle) * 30;
    const y = Math.sin(angle) * 25;
    const z = 15;

    // Golden hour shift
    const isGolden = hourOfDay <= 8 || hourOfDay >= 16;
    const lightColor = isGolden ? new THREE.Color('#ffb74d') : new THREE.Color('#fff9e6');
    const lightIntensity = Math.max(0.1, Math.sin(angle) * 2.2);

    return { position: [x, Math.max(1, y), z] as [number, number, number], intensity: lightIntensity, color: lightColor };
  }, [hourOfDay]);

  return (
    <directionalLight
      position={position}
      intensity={intensity}
      color={color}
      castShadow
      shadow-mapSize-width={2048}
      shadow-mapSize-height={2048}
    />
  );
}`,
        },
      ],
    },
    ship: {
      sections: [
        {
          title: 'Draco Compression',
          text: '3D geometry is compressed down by 82% using Google Draco compression algorithms, enabling instant loading even over cellular 4G connections.',
        },
        {
          title: 'High-Conversion Off-Plan Sales',
          text: 'Empowered real estate developers to pre-sell over 40% of housing units prior to groundbreaking through interactive customizer links.',
        },
      ],
    },
  },
  {
    slug: 'saas-gatekeeper',
    title: 'SaaS Billing & Subscription Gatekeeper',
    year: '2026',
    category: 'API Security & Infrastructure',
    tags: ['Node.js', 'Express', 'JWT', 'MongoDB', 'Redis'],
    image: '/assets/saas.jpeg',
    imageAlt: 'Subscription management portal showing customer tiers and token quotas',
    summary: 'A plug-and-play middleware authentication and rate-limiting system built to restrict API usage, feature flags, and token quotas based on active user subscription tiers.',
    githubUrl: 'https://github.com/david-karanja/saas-billing-gatekeeper',
    obsess: {
      headline: 'Bulletproof Subscription Quotas and Feature Flags',
      paragraphs: [
        'Developers building multi-tenant SaaS products often struggle with fragmented billing checks scattered throughout their codebase, resulting in security leaks and unpaid quota abuse.',
        'Gatekeeper acts as a centralized middleware proxy that intercepts incoming API calls, inspects cryptographically signed JWT tokens, and enforces rate limits and feature access rules in under 2 milliseconds.',
        'Integrates webhook synchronizers with payment providers (Stripe, M-Pesa, Lemonsqueezy) to downgrade or suspend access the moment a subscription lapses.',
      ],
    },
    design: {
      palette: [
        { name: 'Gateway Dark', hex: '#0a0d14', rgb: '10 13 20', pms: 'Black 6 C' },
        { name: 'Key Cyan', hex: '#06b6d4', rgb: '6 182 212', pms: '3115 C' },
        { name: 'Shield Purple', hex: '#8b5cf6', rgb: '139 92 246', pms: '266 C' },
        { name: 'Muted Slate', hex: '#64748b', rgb: '100 116 139', pms: 'Cool Gray 9 C' },
        { name: 'Bright White', hex: '#ffffff', rgb: '255 255 255', pms: 'White C' },
      ],
      typefaces: [
        { name: 'Space Grotesk', category: 'sans', weights: ['Regular 400', 'Bold 700'], sample: 'Aa' },
        { name: 'JetBrains Mono', category: 'mono', weights: ['Book 400', 'Bold 700'], sample: 'Aa' },
      ],
      componentsSummary: 'API key generator token card, tier quota usage gauge, webhook event inspector, and billing cycle countdown badge.',
      interactiveDemoTitle: 'Sliding Window Token Bucket',
      interactiveDemoDescription: 'Enforces sub-second rate limiting using Redis atomic INCR and EXPIRE operations with zero database lag.',
    },
    code: {
      technologies: [
        { name: 'Node.js & Express', url: 'https://expressjs.com', note: 'High-throughput reverse proxy middleware' },
        { name: 'Redis', url: 'https://redis.io', note: 'In-memory sliding window rate-limit token bucket' },
        { name: 'MongoDB', url: 'https://mongodb.com', note: 'Tenant subscription records and audit trail logs' },
        { name: 'JWT & RSA256', url: 'https://jwt.io', note: 'Cryptographic asymmetric claim verification' },
      ],
      architecture: [
        {
          name: 'gatekeeper/',
          type: 'folder',
          expanded: true,
          children: [
            {
              name: 'middleware/',
              type: 'folder',
              expanded: true,
              children: [
                { name: 'authGuard.ts', type: 'file' },
                { name: 'quotaLimiter.ts', type: 'file' },
                { name: 'featureGate.ts', type: 'file' },
              ],
            },
            {
              name: 'webhooks/',
              type: 'folder',
              children: [
                { name: 'stripeHandler.ts', type: 'file' },
                { name: 'mpesaHandler.ts', type: 'file' },
              ],
            },
          ],
        },
      ],
      implementation: [
        {
          filename: 'quotaLimiter.ts',
          language: 'typescript',
          code: `import { Request, Response, NextFunction } from 'express';
import { redisClient } from '../redis';

export async function quotaLimiter(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.header('X-API-Key');
  if (!apiKey) {
    return res.status(401).json({ error: 'Missing API Key' });
  }

  const key = \`quota:\${apiKey}:\${Math.floor(Date.now() / 60000)}\`;
  const usage = await redisClient.incr(key);
  if (usage === 1) {
    await redisClient.expire(key, 60);
  }

  const limit = (req as any).tierLimit || 1000;
  if (usage > limit) {
    return res.status(429).json({
      error: 'Rate limit exceeded for current subscription tier.',
      upgradeUrl: 'https://app.karanjadavid.com/billing',
    });
  }

  res.setHeader('X-RateLimit-Remaining', Math.max(0, limit - usage));
  next();
}`,
        },
      ],
    },
    ship: {
      sections: [
        {
          title: 'Sub-2ms Middleware Overhead',
          text: 'Benchmarked with Autocannon under 10,000 req/sec; Redis sliding window adds less than 1.8 milliseconds of latency.',
        },
        {
          title: 'Multi-Cloud Gateway',
          text: 'Deployed across edge Docker clusters, allowing engineering teams to protect internal microservices without code duplication.',
        },
      ],
    },
  },
];

/* ─── Compatibility for Work, Services, Funding, etc. ──────── */

export const WORK = CASE_STUDIES.map((c) => ({
  slug: c.slug,
  title: c.title,
  image: c.image,
  imageAlt: c.imageAlt,
  text: c.summary,
  stack: c.tags.join(', '),
  href: `/projects/${c.slug}`,
}));

export const CAPABILITIES = [
  { title: 'Full-stack engineering', text: 'Angular, React, TypeScript, Laravel, Spring Boot.' },
  { title: 'ERP & business systems', text: 'Multi-tenant Dolibarr, custom internal tools.' },
  { title: '3D & interactive web', text: 'Three.js configurators, data-heavy dashboards.' },
  { title: 'Data engineering', text: 'Pipelines, validation, integration with existing tools.' },
  { title: 'Production AI', text: 'LLM extraction and assistants with eval sets.' },
  { title: 'Statistical modelling', text: 'Forecasting, anomaly detection, optimisation.' },
];

export const IDEAS = [
  {
    title: 'Modelling the business',
    text: 'Every order, booking or invoice follows a defined life cycle. I map it as an explicit state machine in the code, so no record ends up in a state nobody planned for.',
  },
  {
    title: 'Schema-validated AI output',
    text: 'Language models are excellent at pulling fields out of messy documents, but they are probabilistic. I wrap them in JSON schema validation, confidence thresholds and a review queue.',
  },
  {
    title: 'Performance by design',
    text: 'A report that takes a second with 100 rows can take an hour with 100,000. I choose data structures, indexes and query plans so your system stays fast as you grow.',
  },
  {
    title: 'Invariants in tests',
    text: 'I write down the rules that must always hold — stock never negative, payments always matching invoices — and test them continuously.',
  },
];

export const SERVICES = [
  {
    title: 'Custom business systems',
    text: 'Internal tools, booking and operations platforms modelled on how your team actually works.',
    result: 'Less spreadsheet juggling, fewer errors, one source of truth.',
  },
  {
    title: 'API integrations & backend scaling',
    text: 'Connecting legacy software, automating manual data entry, and optimising databases so infrastructure doesn’t buckle as you grow.',
    result: 'Eliminated manual copy-pasting and zero downtime during traffic spikes.',
  },
  {
    title: 'SaaS product development',
    text: 'Turning your idea into a market-ready web app. Secure auth, multi-tenant billing, clean code your future team can extend.',
    result: 'A launch-ready product built right the first time.',
  },
  {
    title: '3D and data-heavy web apps',
    text: 'Product customisers, trading dashboards and analytics that stay smooth under real data volumes.',
    result: 'Customers see and shape the product before buying.',
  },
];

export const TESTIMONIALS = [
  {
    quote: 'He asked questions nobody else had asked, then delivered a system that matched how we actually run the shop.',
    name: 'Client name',
    role: 'Operations manager, retail business',
    placeholder: true,
  },
  {
    quote: 'Every Friday we saw something working. There were no surprises at launch.',
    name: 'Client name',
    role: 'Founder, online store',
    placeholder: true,
  },
  {
    quote: 'The handover was thorough. My team could run and extend the system without calling him.',
    name: 'Client name',
    role: 'Director, services company',
    placeholder: true,
  },
];

export const TIERS = [
  { min: 25, off: 5 },
  { min: 100, off: 10 },
  { min: 250, off: 15 },
];
export const PRESETS = [25, 100, 250];

export const FUNDING = [
  {
    id: 'creator',
    title: 'Creator Studio templates',
    text: 'More product templates and a faster 3D editor.',
    goal: 2000,
    raised: 0,
    backers: 0,
    updates: 'Shipping templates in weekly batches',
  },
  {
    id: 'nexus',
    title: 'NexusFX Pro open tools',
    text: 'Backtesting module and strategy documentation.',
    goal: 3000,
    raised: 0,
    backers: 0,
    updates: 'Backtesting module in development',
  },
  {
    id: 'erp',
    title: 'Dolibarr deployment kit',
    text: 'A reusable setup for small-business ERP in Kenya.',
    goal: 1500,
    raised: 0,
    backers: 0,
    updates: 'First deployment kit ships this quarter',
  },
];

export const DEFAULT_FUNDING_ID = FUNDING[0].id;

export const TERMS = [
  'Your pledge goes to the project you choose.',
  'It earns a discount code for a project of yours, valid for 12 months.',
  'The discount applies to the fee on a signed quote, one code per project.',
  'Pledges support open projects and are not refundable.',
];

export const STEPS = [
  { title: 'Listen', text: 'We talk through your business, not the technology. I write back what I understood.' },
  { title: 'Model', text: 'I turn your process and data into a precise model: entities, rules, edge cases.' },
  { title: 'Build', text: 'Small increments, demoed weekly, so you can steer early.' },
  { title: 'Verify', text: 'Automated tests check the rules that must never break.' },
  { title: 'Hand over', text: 'Documentation, training and full ownership of the code and data.' },
];

export const TRUST_STRIP = {
  intro: 'Systems currently running in production for',
  items: [
    { label: 'Retail & distribution' },
    { label: 'Logistics & delivery' },
    { label: 'Property & construction' },
  ],
};

export const PROMISES = [
  {
    title: 'Systems your team actually uses',
    text: 'I model how your business really runs — not how a flowchart says it should — then build the smallest system that fits.',
  },
  {
    title: 'Performance by design',
    text: 'Data structures, indexes and query plans chosen so your system stays fast as you grow.',
  },
  {
    title: 'Full ownership at handover',
    text: 'Fixed scope, weekly demos, documentation and training. The code, the data and the decisions are yours.',
  },
];

export type DonationChannel = {
  id: string;
  label: string;
  description: string;
  url: string;
  kind: 'link' | 'mpesa';
  active: boolean;
};

export const DONATIONS = {
  heading: 'Support the work',
  intro:
    'If something I built or wrote saved you time, you can chip in — no strings, no obligation.',
  mpesa: { paybill: '247247', till: '5555555', account: 'support' }, // ← set real values to activate
  channels: [
    {
      id: 'bmac',
      label: 'Buy Me a Coffee',
      description: 'One-off tip via card.',
      url: 'https://buymeacoffee.com/your-handle',
      kind: 'link',
      active: true,
    },
    {
      id: 'kofi',
      label: 'Ko-fi',
      description: 'One-off tip, no account needed.',
      url: 'https://ko-fi.com/your-handle',
      kind: 'link',
      active: true,
    },
    {
      id: 'gh',
      label: 'GitHub Sponsors',
      description: 'Recurring support.',
      url: 'https://github.com/sponsors/your-handle',
      kind: 'link',
      active: true,
    },
    {
      id: 'paypal',
      label: 'PayPal.me',
      description: 'One-off tip via PayPal.',
      url: 'https://paypal.me/your-handle',
      kind: 'link',
      active: false,
    },
    {
      id: 'mpesa',
      label: 'M-Pesa',
      description: 'Send a one-off tip from Kenya.',
      url: '',
      kind: 'mpesa',
      active: true,
    },
  ] as DonationChannel[],
};

export type DonationConfig = typeof DONATIONS;
