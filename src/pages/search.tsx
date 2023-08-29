import NewsCardSimple from "@/components/newscard-simple";

export default function Search() {
  return (
    <div className="space-y-6">
      <div>
        Menampilkan hasil pencarian <strong>Festival Tabot</strong>
      </div>

      <div className="space-y-2">
        <NewsCardSimple />
        <NewsCardSimple />
        <NewsCardSimple />
        <NewsCardSimple />
        <NewsCardSimple />
        <NewsCardSimple />
        <NewsCardSimple />
      </div>
    </div>
  );
}
