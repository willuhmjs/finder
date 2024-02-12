<script lang="ts">
  $: logs = [""];

  let cmd: string = "";

  const commands = {
    control: "M601 S1",
    setTemp: (temp: number = 200) => `M104 S${temp} T0`,
    tempOff: "M104 S0 T0",
    stop: "M112",
    home: (axes: string = "X Y Z") => `G28 ${axes}`,
    lightOff: "M146 r0 g0 b0 F0",
    lightOn: "M146 r255 g255 b255 F0",
   // fanOff: "M106 S0",
    // fanOn: "M106 S255", 
    extendProbe: "M116",
    retractProbe: "M117",
    progress: "M27",
    status: "M119",
    temperature: "M105",
    info: "M115",
    
  }


  async function execCommand(cmd: string) {
    try {
      const response = await fetch("/command", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cmd
        })
      });

      const log = await response.text() || "No response";
      logs = [...logs, log];
    } catch (error) {
      console.error(error);
    }
  }
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<form on:submit|preventDefault={() => execCommand(cmd)}>
  <label>
    Command:
    <input type="text" bind:value={cmd} />
  </label>
  <button type="submit">Submit</button>
</form>

<!-- home all -->

{#each Object.keys(commands) as command}
    {#if typeof commands[command] === "string"}
      <button on:click={() => execCommand(commands[command])}>{command}</button>
        {/if}
{/each}

{#each logs as log}
  <p>{log}</p>
{/each}