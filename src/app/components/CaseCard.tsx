import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

export type CaseStudy = {
  title: string;
  dates: string;
  image: StaticImageData;
  aspectRatio: string;
  href?: string;
  clickable?: boolean;
};

export default function CaseCard({ project }: { project: CaseStudy }) {
  const clickable = project.clickable ?? true;

  const inner = (
    <>
      <Image
        src={project.image}
        alt={project.title}
        sizes="(min-width: 640px) 50vw, 100vw"
        className="block h-full w-full object-cover"
      />
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 opacity-0 transition-opacity duration-300 ease-out motion-reduce:transition-none pointer-fine:group-hover:opacity-100">
        <span className="rounded-lg bg-white px-4 py-2.5 text-[14px] font-normal text-zinc-800">
          {project.title}
        </span>
        <span className="rounded-lg bg-white px-4 py-2.5 text-[14px] font-normal text-zinc-800">
          {project.dates}
        </span>
      </div>
    </>
  );

  const className =
    "group relative block w-full overflow-hidden rounded-xl bg-zinc-100 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none pointer-fine:hover:scale-[0.97]";

  if (!clickable) {
    return (
      <div
        className={`${className} cursor-default`}
        style={{ aspectRatio: project.aspectRatio }}
      >
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={project.href ?? "#"}
      className={className}
      style={{ aspectRatio: project.aspectRatio }}
    >
      {inner}
    </Link>
  );
}
