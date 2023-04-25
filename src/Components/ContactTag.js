function ContactTag({ tag, icon, tagValue }) {
  return (
    <div className="flex">
      <div className="flex justify-center items-center mr-3">
        <div className="rounded-full p-3 bg-teal-600">{icon}</div>
      </div>

      <div className="flex flex-col">
        <div className="">
          <h2 className=" text-lg font-medium text-emerald-600 sm:text-lg">
            {tag}
          </h2>
        </div>
        <div className="mt-1 text-sm text-slate-900 ">
          <p>{tagValue}</p>
        </div>
      </div>
    </div>
  );
}

export default ContactTag;
