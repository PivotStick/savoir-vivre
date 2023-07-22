<script context="module">
	import { backOut, expoOut } from "svelte/easing";
	import { writable } from "svelte/store";
	import { scale, slide } from "svelte/transition";
	import { v4 } from "uuid";

	/**
	 * @typedef {{
	 *  uuid: string;
	 *  title?: string;
	 *  message: string;
	 *  type: "normal" | "danger" | "success" | "warning"
	 * }} Snack
	 */
	const initSnacks = () => {
		const { subscribe, update } = writable(/** @type {Snack[]} */ ([]));

		/**
		 * @type {ReturnType<typeof setInterval>=}
		 */
		let interval;

		/**
		 * @param {Pick<Snack, "message" | "title" | "type">} args
		 */
		const push = (args) => {
			/**
			 * @type {Snack}
			 */
			const snack = { uuid: v4(), ...args };

			update((v) => {
				v.push(snack);
				return v;
			});

			if (interval === undefined) {
				interval = setInterval(() => {
					update((v) => {
						v.shift();

						if (!v.length) {
							clearInterval(interval);
							interval = undefined;
						}

						return v;
					});
				}, 8000);
			}
		};

		/**
		 * @param {Snack} snack
		 */
		const remove = (snack) => update((v) => v.filter((s) => s !== snack));

		return {
			subscribe,
			remove,
			normal: (message = "", title = "") => push({ message, title, type: "normal" }),
			danger: (message = "", title = "Erreur") => push({ message, title, type: "danger" }),
			success: (message = "", title = "Succès") => push({ message, title, type: "success" }),
			warning: (message = "", title = "Attention") => push({ message, title, type: "warning" })
		};
	};

	export const snacks = initSnacks();

	/**
	 * @type {Record<Snack["type"], `fa-${string}`>}
	 */
	const icons = {
		danger: "fa-ban",
		normal: "fa-envelope",
		success: "fa-circle-check",
		warning: "fa-circle-exclamation"
	};
</script>

<ul>
	{#each $snacks as snack (snack.uuid)}
		<li
			class={snack.type}
			transition:slide={{ easing: expoOut }}
			on:click={() => snacks.remove(snack)}
		>
			{#if snack.title}
				<h1>
					<i class="fa {icons[snack.type]}" />
					{snack.title}
				</h1>
			{/if}
			<p>{snack.message}</p>
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		position: fixed;

		bottom: 1rem;
		right: 1rem;
		display: flex;
		flex-direction: column;
		align-items: flex-end;

		z-index: var(--z-index-snacks);

		li {
			cursor: pointer;

			position: relative;
			background-color: white;
			box-shadow: 0 0.5rem 1rem -0.5rem var(--color-700);

			margin-top: 1rem;
			color: var(--color-800);
			padding: 1rem;
			padding-right: 1.5rem;
			border-radius: 0.75rem;

			transition-property: opacity;

			* {
				color: inherit;
			}

			h1 {
				display: flex;
				align-items: center;
				font-size: 1.5rem;
				font-weight: 900;
				margin-bottom: 0.75rem;

				i {
					width: 2rem;
				}
			}

			p {
				white-space: pre-wrap;
			}

			&:active {
				opacity: 0.5;
			}
		}
	}
</style>
