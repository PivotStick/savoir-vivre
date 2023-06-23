<script>
	export let data;

	const key = "__USERNAME__";

	let name = localStorage.getItem(key) || prompt("Ton nom 😎");

	$: if (name) localStorage.setItem(key, name);

	let saving = false;

	const save = async () => {
		saving = true;

		try {
			const res = await fetch("/api/menu", {
				method: "PUT",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(data.menu.categories)
			}).then((res) => res.json());

			console.log(res);
		} catch (error) {
			console.error(error);
		} finally {
			saving = false;
		}
	};
</script>

<div class="page">
	{#if name}
		<input class="name" type="text" bind:value={name} />

		<ul class="categories">
			{#each data.menu.categories as category}
				<li class="categories__category">
					<h1 class="categories__name">{category.name}</h1>
					<ul class="items">
						{#each category.items as item}
							<li class="items__item">
								<label>
									<p>{item.name}</p>
									<input
										type="radio"
										name={category.name}
										checked={item.orders.includes(name)}
										on:input={() => {
											// @ts-ignore
											category.items.forEach((i) => {
												// @ts-ignore
												i.orders = i.orders.filter((o) => o !== name);
											});

											item.orders.push(name);
											item.orders = item.orders;
										}}
									/>
								</label>
							</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	{/if}

	<div class="actions">
		<button disabled={saving} class="success" on:click={save}
			><i class="fa fa-save" /> Enregistrer mon choix</button
		>
	</div>
</div>

<style lang="scss">
	.page {
		padding: 1.5rem;

		> .name {
			margin-bottom: 1rem;
		}

		> .actions {
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
