<script>
	import { v4 } from "uuid";
	import { invalidateAll } from "$app/navigation";
	import MenuItemImage from "$lib/components/MenuItemImage.svelte";
	import { api } from "$lib/api.js";

	export let data;

	$: categories = data.menu.categories;

	let saving = false;

	const reset = () => {
		categories.forEach((category) => {
			category.items = [];
		});

		categories = categories;
	};

	const save = async () => {
		saving = true;

		try {
			const res = await api.put("/menu", categories);
			console.log(res);
		} catch (error) {
			console.error(error);
		} finally {
			saving = false;
		}
	};
</script>

<div class="page">
	<div class="actions">
		<button on:click={reset} class="danger"><i class="fa fa-trash" /></button>
		<button on:click={invalidateAll}><i class="fa fa-sync" /></button>
	</div>

	<ul class="categories">
		{#each categories as category}
			<li class="categories__category">
				<p class="categories__name">{category.name}</p>
				<ul class="items">
					{#each category.items as item}
						<li class="items__item">
							<div class="details">
								<div class="img">
									<MenuItemImage updatable bind:src={item.image} />
								</div>
								<input class="name" type="text" bind:value={item.name} />
								<div class="price">
									<input type="number" inputmode="numeric" bind:value={item.price} />
									€
								</div>
							</div>
							<div class="items__actions">
								<i
									class="fa fa-trash danger"
									on:click={() => {
										category.items = category.items.filter((i) => i !== item);
									}}
								/>
							</div>
						</li>
					{/each}
					<li class="items__add">
						<button
							on:click={() => {
								category.items.push({ id: v4(), name: "", image: "", price: "0" });
								category.items = category.items;
							}}><i class="fa fa-plus" /></button
						>
					</li>
				</ul>
			</li>
		{/each}
	</ul>

	<div class="bottom-actions">
		<button disabled={saving} on:click={save} class="success"><i class="fa fa-save" /> Save</button>
	</div>
</div>

<style lang="scss">
	.page {
		padding: var(--main-padding);
		padding-bottom: calc(var(--main-padding) + 3rem);
	}

	.actions {
		margin-bottom: 2rem;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.5rem;
	}

	.categories {
		display: flex;
		flex-direction: column;

		gap: 4rem;

		&__name {
			font-size: 1.5rem;
			font-weight: 900;
			margin-bottom: 1rem;
		}
	}

	.items {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		&__add {
			margin-top: 1rem;

			button {
				width: max-content;
			}
		}

		&__item {
			display: grid;
			grid-template-columns: 1fr auto;
			gap: 1rem;

			.details {
				display: grid;
				align-items: flex-start;
				gap: inherit;
				grid-template-columns: auto 1fr;
				grid-template-rows: auto auto;

				.img {
					grid-row: 1 / -1;
				}

				.price {
					display: flex;
					align-items: center;
					gap: inherit;
				}
			}
		}

		&__actions {
			i {
				cursor: pointer;

				background-color: var(--color-200);
				color: var(--on-color-200);

				$size: 2rem;

				width: $size;
				height: $size;

				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;

				transition-property: opacity;

				&:active {
					opacity: 0.5;
				}
			}
		}
	}

	.bottom-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;

		margin-top: 5rem;
	}
</style>
