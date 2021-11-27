<script>
	export let user = null;
</script>

<header>
	{#if user}
		<form action="/api/logout" method="post">
			<button>Logout</button>
		</form>
		<a href="/">Home</a>
		<a href="/profile">Profile</a>
	{/if}
</header>
