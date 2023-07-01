<script>
	export let src = "";
	export let updatable = false;

	/**
	 * @type {FileList}
	 */
	let files;
	let error = false;

	/**
	 * @param {File} file
	 */
	const parseFile = (file) => {
		const reader = new FileReader();

		reader.readAsDataURL(file);
		reader.onload = () => {
			if (typeof reader.result === "string") {
				src = reader.result;
			}
		};
	};

	$: if (files) {
		const file = files.item(0);
		if (file) parseFile(file);
	}
</script>

<label class:updatable>
	{#if error || !src}
		<div class="img placeholder">
			<i class="fa fa-image" />
		</div>
	{:else}
		<img class="img" {src} alt="" on:error={() => (error = true)} />
	{/if}
	{#if updatable}
		<input type="file" bind:files accept="image/jpeg, image/png" />
	{/if}
</label>

<style lang="scss">
	label {
		display: block;
		width: max-content;
		height: max-content;

		input {
			display: none;
		}

		&.updatable {
			cursor: pointer;

			opacity: 0.98;
			transition-property: opacity, scale;

			&:hover {
				opacity: 1;
			}

			&:active {
				opacity: 0.5;
				scale: 0.98;
			}
		}
	}

	.img {
		background-color: var(--color-200);
		color: var(--on-color-200);

		width: var(--width, var(--size, 5rem));
		height: var(--height, var(--size, 5rem));

		border-radius: 1rem;
		object-fit: cover;

		display: flex;
		align-items: center;
		justify-content: center;

		i {
			font-size: 1.5rem;
		}
	}
</style>
