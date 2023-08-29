export default function ImageUpload({imagePreview, onChange}) {
  const handleChange = (event) => {
    const file = event.target.files[0];
    onChange(file);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="label">
          <span className="font-semibold label-text">Cover</span>
        </label>
        <input
          type="file"
          accept="image/*"
          className="w-full max-w-xs file-input file-input-bordered"
          onChange={handleChange}
        />
      </div>

      {imagePreview && (
        <img src={imagePreview} className="max-h-[300px] object-contain" />
      )}
    </div>
  );
}
