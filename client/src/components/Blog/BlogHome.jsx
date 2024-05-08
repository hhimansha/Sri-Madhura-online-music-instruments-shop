import React from 'react'


function BlogHome(){
    return (
        <section>
  {/* Container */}
  <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
    {/* Component */}
    <div className="flex flex-col items-center">
      {/* Heading Div */}
      <div className="mb-8 max-w-[800px] text-center md:mb-12 lg:mb-16">
        <h2 className="mb-4 mt-6 text-3xl font-extrabold md:text-5xl">The latest and greatest news</h2>
        <p className="mx-auto mt-4 max-w-[528px] text-[#636262]">Lorem ipsum dolor sit amet elit ut aliquam</p>
      </div>
      {/* Blog Content */}
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Blog Item */}
        <a href="https://neo-saas.webflow.io/blog-posts/7-things-about-web-design-your-boss-wants-to-know" className="flex max-w-full flex-col gap-4 rounded-md px-4 md:px-2">
          <img alt="" src="https://assets.website-files.com/646f6c0e32ec6f9ad7a4504c/646f6c1b66883bd637dfb14a_image9.jpeg" className="inline-block h-60 w-full rounded-2xl object-cover" />
          <div className="flex h-full w-full flex-col items-start justify-around px-0 py-4">
            <div className="mb-4 flex flex-col items-start gap-4">
              <div className="rounded-md bg-[#f6ad1b] px-2 py-1.5">
                <p>Marketing</p>
              </div>
              <p className="text-xl font-bold md:text-2xl">7 Things About Web Design Your Boss Wants To Know</p>
            </div>
            {/* Author */}
            <div className="flex flex-col items-start md:flex-row lg:items-center">
              <p className="text-sm text-[#636262]">Laila Bahar</p>
              <p className="ml-2 mr-2 hidden text-sm text-[#636262] md:block">-</p>
              <p className="text-sm text-[#636262]">6 mins</p>
            </div>
          </div>
        </a>
        {/* Blog Item */}
        <a href="https://neo-saas.webflow.io/blog-posts/7-of-the-best-examples-of-beautiful-blog-design" className="h-ax-w-full flex flex-col gap-4 rounded-md px-4 md:px-2">
          <img alt="" src="https://assets.website-files.com/646f6c0e32ec6f9ad7a4504c/646f6c1b66883bd637dfb14e_image14.jpeg" className="inline-block h-60 w-full rounded-2xl object-cover" />
          <div className="flex h-full w-full flex-col items-start justify-around px-0 py-4">
            <div className="mb-4 flex flex-col items-start gap-4">
              <div className="rounded-md bg-[#f6ad1b] px-2 py-1.5">
                <p>Docs</p>
              </div>
              <p className="text-xl font-bold md:text-2xl">7 of the Best Examples of Beautiful Blog Design</p>
            </div>
            {/* Author */}
            <div className="flex flex-col items-start md:flex-row lg:items-center">
              <p className="text-sm text-[#636262]">Laila Bahar</p>
              <p className="ml-2 mr-2 hidden text-sm text-[#636262] md:block">-</p>
              <p className="text-sm text-[#636262]">6 mins</p>
            </div>
          </div>
        </a>
        {/* Blog Item */}
        <a href="https://neo-saas.webflow.io/blog-posts/the-history-of-web-design" className="hmax-w-full flex flex-col gap-4 rounded-md px-4 md:px-2">
          <img alt="" src="https://assets.website-files.com/646f6c0e32ec6f9ad7a4504c/646f6c1b66883bd637dfb144_image19.jpeg" className="inline-block h-60 w-full rounded-2xl object-cover" />
          <div className="flex h-full w-full flex-col items-start justify-around px-0 py-4">
            <div className="mb-4 flex flex-col items-start gap-4">
              <div className="rounded-md bg-[#f6ad1b] px-2 py-1.5">
                <p>Payment</p>
              </div>
              <p className="text-xl font-bold md:text-2xl">The History Of Web Design</p>
            </div>
            {/* Author */}
            <div className="flex flex-col items-start md:flex-row lg:items-center">
              <p className="text-sm text-[#636262]">Laila Bahar</p>
              <p className="ml-2 mr-2 hidden text-sm text-[#636262] md:block">-</p>
              <p className="text-sm text-[#636262]">6 mins</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</section>

    )
}

export default BlogHome;