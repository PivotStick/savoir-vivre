<script>
	import { slide } from "svelte/transition";

	export let value = "";

	/**
	 * @type {string[]}
	 */
	export let errors = [];
</script>

<label class:danger={errors?.length > 0}>
	<input
		type="text"
		bind:value
		{...$$restProps}
		on:input={() => {
			errors.length = 0;
		}}
	/>
	{#if errors?.length}
		<p in:slide class="errors">{errors.join("\n")}</p>
	{/if}
</label>

<style lang="scss">
	label {
		display: flex;
		flex-direction: column;

		input {
			color: var(--color-700);

			&::placeholder {
				color: var(--color-400);
			}
		}

		.errors {
			margin-left: auto;
			font-size: 0.8rem;
			font-style: italic;

			color: var(--color-600);
		}
	}
</style>
