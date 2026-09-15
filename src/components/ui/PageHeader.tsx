interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <>
      <div className="space-y-4 text-center">
        <h1 className="font-marker text-5xl tracking-wider sm:text-6xl">
          {title}
        </h1>
        <p className="text-xl text-zinc-400">{description}</p>
      </div>
      <hr className="border-zinc-800" />
    </>
  );
}
