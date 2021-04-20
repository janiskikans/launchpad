<template>
  <div class="container mx-auto px-4 lg:px-32 3xl:px-56 mb-12">
    <XyzTransitionGroup appear class="item-grid" xyz="fade up stagger-1.5">
      <div :key="1" class="rounded-sm shadow-md mb-12 lg:mb-16 relative hidden md:block">
        <img
          :key="1"
          src="@assets/images/spacex_launch_wide_v2-min.png"
          alt="spacex launch"
          width="1946"
          height="660"
        />
        <div class="text-white text-opacity-60 absolute bottom-5 left-5">
          <span>
            Photo by
            <better-link
              href="https://unsplash.com/@spacex?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
              text="SpaceX"
              is-external
              has-simple-style
            />
            on
            <better-link
              href="https://unsplash.com/s/photos/rocket?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
              text="Unsplash"
              is-external
              has-simple-style
            />
          </span>
        </div>
      </div>

      <section
        :key="2"
        class="text-center dark:text-gray-100 text-gray-900 p-6 sm:p-12 py-10 mb-8 lg:mb-16 dark:bg-gray-700 bg-white rounded-sm shadow-md"
      >
        <h1 class="text-2xl font-light mb-4">
          About
          <b>Launchpad</b>
        </h1>
        <article class="text-md dark:text-gray-200 text-black leading-relaxed">
          <p class="mb-4 lg:mb-2">
            <b>Launchpad</b>
            is a handy app for rocket launch and space enthusiasts - an easy way to lookup upcoming launches and more at
            a glance. Currently, Launchpad provides a minimalistic and simple overview of upcoming orbital and
            suborbital launches while also allowing to view more detailed launch information.
          </p>
          <p>
            Please take into account that Launchpad is currently in its early stages and is just a side-project.
          </p>
        </article>
      </section>

      <section :key="3" class="text-center dark:text-gray-100 text-white mb-8 lg:mb-16 p-5 sm:p-12 py-6">
        <h1 class="text-2xl font-light mb-4">Under the Hood</h1>
        <article class="dark:text-gray-200 text-white text-md leading-relaxed">
          <p class="mb-4 lg:mb-2">
            Under the hood Launchpad uses the awesome
            <better-link href="https://thespacedevs.com/llapi" text="Launch Library 2" is-external />
            API built by
            <better-link href="https://thespacedevs.com/" text="The Space Devs" is-external />
            as the source of data. Without this API Launchpad would not be possible.
          </p>
          <p class="mb-4 lg:mb-2">
            Launchpad icon is based on an icon by
            <better-link href="https://freeicons.io/profile/2257" text="www.wishforge.games" is-external />
            on
            <better-link href="https://freeicons.io" text="freeicons.io" is-external />
            <span>.</span>
          </p>
          <p>
            A more detailed up-to-date list of technologies used can be found on Launchpad's
            <better-link href="https://github.com/janiskikans/launchpad" text="GitHub repository" is-external />
            <span>'s readme.</span>
          </p>
        </article>
      </section>

      <section
        :key="4"
        class="text-center dark:text-gray-100 text-gray-900 p-6 sm:p-12 py-10 mb-8 lg:mb-16 dark:bg-gray-700 bg-white rounded-sm shadow-md"
      >
        <div class="flex flex-col lg:flex-row items-center">
          <h1 class="text-2xl font-light lg:hidden">
            About the
            <b>Developer</b>
          </h1>
          <img
            src="@assets/images/janis_kikans_profile.jpeg"
            alt="author profile image"
            height="225"
            width="225"
            class="rounded-full m-6 shadow-md hover:"
          />
          <article>
            <h1 class="text-2xl font-light mb-4 hidden lg:block">
              About the
              <b>Developer</b>
            </h1>
            <div class="text-md dark:text-gray-200 text-black leading-relaxed">
              <p>
                <b>Hello!</b>
                I am Janis, and I am a Full Stack Web Developer from
                <better-link href="https://maps.google.com/?q=latvia" text="Riga, Latvia" is-external />
                (that small country between Estonia and Lithuania in Northern Europe). As you maybe have noticed based
                on this app I am also a hobby-level space and rocket enthusiast.
                <br />
                What do we get when those 2 things are combined?
              </p>
              <p class="text-lg font-mono mt-4 md:mt-2">
                <b>Web Developer</b>
                +
                <b>Space/Rocket Enthusiast</b>
                =
                <b>Launchpad</b>
              </p>
            </div>
          </article>
        </div>
      </section>
    </XyzTransitionGroup>
  </div>
</template>

<script>
import BetterLink from '@components/utils/BetterLink';

export default {
  name: 'About',

  components: { BetterLink },
};
</script>
