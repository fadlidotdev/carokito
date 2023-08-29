interface Props {
  label: string;
}

export default function Tag({label}: Props) {
  return <div className="h-8 badge bg-primary/10">#{label}</div>;
}
