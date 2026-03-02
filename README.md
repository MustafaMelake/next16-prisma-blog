# StoryFlow — Modern Full-Stack CMS & Blogging Platform

**StoryFlow** is a high-performance blogging engine built with the cutting-edge Next.js 16 and React 19 stack. Designed for speed, scalability, and an elite user experience, it features a robust administrative dashboard, role-based access control, and seamless server-side processing.

---

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Actions, Streaming)
- **Library:** [React 19](https://react.dev/) (Concurrent Rendering, React Compiler)
- **Database:** [Prisma ORM](https://www.prisma.io/) with PostgreSQL (Neon/Supabase)
- **Authentication:** [Better Auth](https://better-auth.com/) (Google & GitHub OAuth, RBAC)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **State & UI:** [Sonner](https://sonner.emilkowal.ski/) (Notifications), [Lucide](https://lucide.dev/) (Icons)

---

## ✨ Key Features

### 📖 Reader Experience

- **Reading Progress Bar:** Real-time visual scroll indicator.
- **Dynamic Reading Time:** Automated WPM-based calculation for every post.
- **Skeleton Loaders:** Eliminates Layout Shift (CLS) for a premium feel.
- **Dark Mode:** Fully integrated theme switching with `next-themes`.

### 🛠 Administrative & Author Tools

- **Full Dashboard:** Aggregated analytics for Total Likes, Comments, and Posts.
- **Content Management:** Create, Edit, Delete, and "Live/Draft" toggle functionality.
- **Admin Roles:** Specialized views for User Management and global content oversight.
- **Server-Side Search:** Instant, SEO-friendly filtering via URL search parameters.

### ⚡ Performance Optimized

- **React 19 Transitions:** Smooth UI updates without blocking the main thread.
- **Zero CLS:** Precision-engineered Skeletons matching the final UI layout.
- **Efficient Data Fetching:** Leveraging Prisma with custom pagination logic.

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/storyflow.git
cd storyflow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file and add your credentials:

```env
DATABASE_URL="your_postgresql_url"
BETTER_AUTH_SECRET="your_secret"
BETTER_AUTH_URL="http://localhost:3000"

GITHUB_CLIENT_ID="your_id"
GITHUB_CLIENT_SECRET="your_secret"

NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database & Build

```bash
npx prisma generate
npx prisma db push
npm run build
```

### 5. Run Development

```bash
npm run dev
```

---

## 📈 Audit Results

The platform maintains near-perfect scores across all Core Web Vitals:

| Category           | Score |
| :----------------- | :---- |
| **Performance**    | 98+   |
| **Accessibility**  | 100   |
| **Best Practices** | 100   |
| **SEO**            | 100   |

---

## 📁 Project Structure

```text
├── actions/           # Server-side logic for mutations
├── app/               # Next.js 16 App Router (Routes & Loading states)
├── components/        # UI System (Shadcn + Custom Logic)
├── lib/               # Shared logic (Prisma Client, Auth, Utils)
└── prisma/            # Schema definition & DB configuration
```

## 📄 License

This project is licensed under the MIT License.
