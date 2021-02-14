<template>
  <div class="container mx-auto px-4 lg:px-36 xl:px-52 mb-12">
    <XyzTransitionGroup appear class="item-grid space-y-12" xyz="fade up stagger-2">
      <div :key="1" class="text-center text-gray-100 p-4 py-6 bg-gray-700 rounded-sm shadow-lg">
        <h1 class="text-3xl font-light mb-6">
          About
          <b>Launchpad</b>
        </h1>
        <p class="text-lg text-gray-200">
          Launchpad is a handy app for rocket launch and space enthusiasts. An easy way to look up upcoming launches and
          more at a glance.
        </p>
      </div>

      <div :key="2" class="text-center text-gray-100 p-4 py-8">
        <h1 class="text-3xl font-light mb-6">Under the Hood</h1>
        <p class="text-lg text-gray-200">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore perferendis earum tempora accusamus nobis
          aspernatur quod saepe nam quibusdam aliquid consectetur expedita pariatur eum voluptatem commodi, ipsam
          distinctio ex? Maiores reprehenderit, inventore unde recusandae, illo ut rem impedit eligendi, pariatur
          doloribus rerum expedita earum ducimus voluptas quis quaerat quasi reiciendis?
        </p>
      </div>

      <div :key="3" class="text-center text-gray-100 rounded-sm p-4 py-6 bg-gray-700 shadow-lg">
        <div class="flex flex-col lg:flex-row items-center">
          <img
            src="@assets/images/janis_kikans_profile.jpeg"
            alt="author profile image"
            height="225"
            width="225"
            class="rounded-full m-6 shadow-md hover:"
          />
          <div>
            <h1 class="text-3xl font-light mb-6">
              Author
            </h1>
            <p class="text-lg text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus aliquam praesentium minus reiciendis
              incidunt repudiandae adipisci dolores officiis obcaecati dolore deleniti voluptate nisi explicabo
              similique, amet magni rem, maxime blanditiis nobis? Doloribus quaerat ab assumenda explicabo sint maiores
              excepturi architecto.
            </p>
          </div>
        </div>
      </div>
    </XyzTransitionGroup>
  </div>
</template>

<script>
export default {
  name: 'UnderTheHood',
};
</script>
