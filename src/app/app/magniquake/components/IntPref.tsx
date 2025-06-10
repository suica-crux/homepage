export default function PrefBlock({
  prefName,
  cities,
}: {
  prefName: string;
  cities: string[];
}) {
  return (
    <div className="ml-4 mt-2">
      <h3 className="text-lg font-semibold">{prefName}</h3>
      <ul className="ml-4 list-disc">
        {cities.map((city) => (
          <li key={city}>{city}</li>
        ))}
      </ul>
    </div>
  );
}
