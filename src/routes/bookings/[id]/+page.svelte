<script>
	import { page } from "$app/stores";

	export let data;

	const key = "__USERNAME__";

	let saving = false;
	let name = (localStorage.getItem(key) || prompt("Ton nom 😎"))?.toLowerCase().slice(0, 15);

	/** @type {Record<string, string>} */
	let orders = data.menu.categories.reduce((a, c) => {
		const order = data.booking.orders?.find((o) => o.username === name);

		if (order) {
			const item = c.items.find((i) => order.items.includes(i.id));
			if (item) {
				a[c.name] = item.id;
			}
		}

		return a;
	}, /** @type {Record<string, string>} */ ({}));

	$: if (name) {
		localStorage.setItem(key, name);
	}

	const save = async () => {
		saving = true;

		try {
			const res = await fetch($page.url.pathname + "?/saveChoices", {
				method: "post",
				body: JSON.stringify({
					username: name,
					items: Object.values(orders).filter((o) => o)
				})
			});

			console.log(res);
		} catch (error) {
			console.error(error);
		} finally {
			saving = false;
		}
	};
</script>

<div class="page">
	<h1>{data.booking.name}</h1>

	{#if name}
		<div class="actions">
			<button
				on:click={() => {
					name = prompt("Ton nouveau nom 😎")?.toLowerCase().slice(0, 15) || name;
				}}
			>
				<i class="fa fa-signature" />
				{name}
			</button>
		</div>

		<ul class="categories">
			{#each data.menu.categories as category}
				<li class="categories__category">
					<h1 class="categories__name">
						{category.name}
						<button
							class="danger"
							on:click={() => {
								orders[category.name] = "";
							}}
						>
							<i class="fa fa-sync" />
						</button>
					</h1>
					<ul class="items">
						{#each category.items as item}
							<li class="items__item">
								<label>
									<p>{item.name}</p>
									<input
										type="radio"
										name={category.name}
										value={item.id}
										bind:group={orders[category.name]}
									/>
								</label>
							</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>

		<div class="bottom-actions">
			<button disabled={saving} class="success" on:click={save}>
				<i class="fa fa-save" /> Enregistrer mon choix
			</button>
		</div>
	{:else}
		<button
			on:click={() => {
				name = prompt("Ton nom 😎")?.toLowerCase().slice(0, 15) || name;
			}}
		>
			<i class="fa fa-signature" />
			Choisir un nom
		</button>
	{/if}
</div>

<style lang="scss">
	.page {
		padding: var(--main-padding);

		> h1 {
			font-size: 2.5rem;
			font-weight: 900;
			margin-bottom: 2rem;
		}

		> .actions {
			margin-bottom: 3rem;
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;
		}

		> .bottom-actions {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;

			margin-top: 3rem;
		}
	}

	.categories {
		display: flex;
		flex-direction: column;
		gap: 3rem;

		&__name {
			font-size: 2rem;
			font-weight: 900;
			margin-bottom: 1rem;

			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			gap: 0.5rem;

			button {
				width: max-content;
				padding: 0.5rem;
				font-size: 1rem;
			}
		}
	}

	.items {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		&__item {
			label {
				cursor: pointer;

				background-color: var(--color-50);
				color: var(--on-color-50);
				padding: 0.5rem 0.75rem;
				display: flex;
				border-radius: 0.5rem;

				outline: 0px solid var(--color-50);

				transition-property: opacity, background-color, outline-width;

				p {
					width: 100%;
				}

				input {
					margin-left: auto;
					width: max-content;
					outline: none;

					accent-color: var(--color-500);
				}

				&:has(input:checked) {
					background-color: var(--color-100);
					color: var(--on-color-100);
				}

				&:active {
					opacity: 0.5;
				}

				&:focus-within {
					outline-width: 4px;
				}
			}
		}
	}
</style>
