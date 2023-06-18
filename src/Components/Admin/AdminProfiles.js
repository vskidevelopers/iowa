import React from "react";
import Img1 from "../../Assets/Imgs/Discovery1.jpg";

function AdminProfiles() {
  return (
    <div>
      <div className="w-full px-6 mx-auto">
        <div className="min-h-[18.75rem] relative mt-6 flex items-center overflow-hidden rounded-2xl bg-[url('https://demos.creative-tim.com/soft-ui-dashboard-pro-tailwind/assets/img/curved-images/curved0.jpg')] bg-cover bg-center p-0">
          <span className="absolute inset-y-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-purple-700 to-pink-500 opacity-60"></span>
        </div>
        <div className="relative flex flex-col flex-auto min-w-0 p-4 mx-6 -mt-16 overflow-hidden break-words border-0 shadow-blur dark:shadow-soft-dark-xl dark:bg-gray-950 rounded-2xl bg-white/80 bg-clip-border backdrop-blur-2xl backdrop-saturate-200">
          <div className="flex flex-wrap -mx-3">
            <div className="flex-none w-auto max-w-full px-3">
              <div className=" h-20 w-20 text-base ease-soft-in-out  relative inline-flex items-center justify-center rounded-xl text-white transition-all duration-200">
                <img
                  src={Img1}
                  alt="profile_image"
                  className="w-full shadow-soft-sm rounded-xl "
                />
              </div>
            </div>
            <div className="flex-none w-auto max-w-full px-3 my-auto">
              <div className="h-full">
                <h5 className="mb-1 text-emerald-500">Susan Rienye</h5>
                <p className="mb-0 font-semibold leading-normal text-sm text-slate-500 dark:opacity-60">
                  CEO / Co-Founder
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 mt-6">
          <h3 class="mb-4 text-xl font-bold">General information</h3>
          <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div class="sm:col-span-2">
              <dt class="text-lg font-medium text-gray-900">About me</dt>
              <dd class="mt-1 space-y-3 max-w-prose text-sm text-gray-500">
                <p>
                  I'm Susan Rienye, the CEO of Iowa Eateries Hotel. With a deep
                  passion for hospitality, I lead our team to deliver
                  exceptional guest experiences and maintain our reputation for
                  excellence. I prioritize creating a welcoming atmosphere and
                  ensuring every guest's stay is memorable. I actively
                  contribute to the community, forging strong partnerships and
                  promoting tourism.
                </p>
                <p>
                  As a leader, I empower my team, foster a positive work
                  culture, and champion sustainable business practices. At Iowa
                  Eateries Hotel, we strive to exceed expectations and provide
                  unforgettable experiences for our guests.
                </p>
              </dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Education</dt>
              <dd class="text-sm font-semibold text-gray-900">
                {`<< Add educational info here >>`}
              </dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Work History</dt>
              <dd class="text-sm font-semibold text-gray-900">
                {`<< Add work info here >>`}
              </dd>
            </div>

            <div>
              <dt class="text-sm font-medium text-gray-500">Languages</dt>
              <dd class="text-sm font-semibold text-gray-900">
                English, {`<< Add more Languages here >>`}
              </dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Organization</dt>
              <dd class="text-sm font-semibold text-gray-900">
                Iowa Eateries{" "}
                {`<< Add organisations info here if applicable >>`} .
              </dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Role</dt>
              <dd class="text-sm font-semibold text-gray-900">
                Ceo Iowa Eateries
              </dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Department</dt>
              <dd class="text-sm font-semibold text-gray-900">Management</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Birthday</dt>
              <dd class="text-sm font-semibold text-gray-900">
                {`<< Add birthday info here >>`}{" "}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default AdminProfiles;
