<script>
	import { nav } from "$lib/stores/nav";

	export let data;

	$: if (data.user) {
		nav.set([
			{
				href: "/admin",
				icon: "fa-hand"
			},
			{
				href: "/admin/menu",
				icon: "fa-newspaper"
			}
		]);
	} else {
		nav.set([]);
	}
</script>

<slot />
