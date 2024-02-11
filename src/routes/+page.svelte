<script>
  let formData = {
    cmd: ""
  };

  async function handleSubmit() {
    try {
      const response = await fetch("/command", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      console.log(await response.text());
    } catch (error) {
      console.error(error);
    }
  }
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<form on:submit|preventDefault={handleSubmit}>
  <label>
    Command:
    <input type="text" bind:value={formData.cmd} />
  </label>
  <button type="submit">Submit</button>
</form>
