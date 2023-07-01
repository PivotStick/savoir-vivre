<script>
	import "@fortawesome/fontawesome-free/css/all.min.css";
	import "../app.scss";
	import { nav } from "$lib/stores/nav";
</script>

<svelte:head>
	<title>🍽️ Savoir Vivre 🍔</title>
</svelte:head>

<div class="layout">
	<nav>
		{#each $nav as link (link.href)}
			<a href={link.href}><i class="fa {link.icon}" /></a>
		{/each}
	</nav>
	<main>
		<slot />
	</main>
</div>

<style lang="scss">
	.layout {
		height: 100vh;

		@media only screen and (hover: none) and (pointer: coarse) {
			height: -moz-available;
			height: -webkit-fill-available;
			height: fill-available;
		}

		@media all and (display-mode: standalone) {
			height: 100vh;
		}

		overflow: hidden;

		display: grid;
		grid-template-rows: auto 1fr;
	}

	nav {
		background-color: var(--color-900);
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		gap: 1rem;

		a {
			$size: 2rem;

			background-color: var(--color-700);
			color: var(--on-color-700);

			width: $size;
			height: $size;

			display: flex;
			align-items: center;
			justify-content: center;

			border-radius: 0.5rem;

			transition-property: opacity;

			&:active {
				opacity: 0.5;
			}
		}
	}

	main {
		overflow: auto;

		--main-padding: 1.5rem;
	}
</style>
