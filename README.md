# VRCDynamicPlayerTags

> Dynamic player detection and text display system for VRChat worlds

Hey there! This is a system I built to help VRChat world creators easily detect players and update TextMeshPro (TMP) objects based on who's in trigger zones. Think of it like a plug-and-play solution for things like "who's sitting in this chair" or "who won this game" without having to write a bunch of Udon code yourself.

## What Does This Thing Do?

VRCDynamicPlayerTags lets you:
- Detect when players enter trigger zones
- Automatically update TMP text objects with player display names
- Choose between simple text or colored text with fancy formatting
- Use community-created presets for popular VRChat prefabs
- Strip and reconfigure setups without breaking your world

Perfect for:
- Seating systems (show who's sitting where)
- Game scoreboards (display current player, winners, etc.)
- Interactive chairs and props
- Any situation where you need to display "Player X is here"

## Quick Start

1. **Install the package** in your Unity project
2. **Open the Manager:** `baloneys → VRC Dynamic Player Tags Manager`
3. **Get a preset code** from the database (click the 🌐 button) or configure manually
4. **Enter the code** and click "Fetch" (or skip this for manual setup)
5. **Select your Root GameObject** (the parent containing your triggers and TMPs)
6. **Review the configuration** (TMPs and Triggers should auto-populate from preset)
7. **Click "✨ Tagify GameObject"**
8. **Done!** Your triggers now update TMP objects with player names

## Installation

### Requirements
- Unity 2022.3.6f1 or later (whatever VRChat currently uses)
- VRChat SDK3 - Worlds
- UdonSharp (comes with the SDK)
- TextMeshPro (usually already in your project)

### Steps
1. Download the latest release from [your download location]
2. Import the `.unitypackage` into your project
3. Let Unity import everything (it'll take a moment)
4. You should see `baloneys` in your Unity menu bar

That's it! You're ready to go.

## The Manager Tool

**Location:** `baloneys → VRC Dynamic Player Tags Manager`

This is your main interface for setting up the system. Here's what each part does:

### 🌐 Open Preset Database
Big blue button at the top that opens the [preset database](https://kanaris-beans.com/dynabackend/vrc-dynamic-player-tags.html) in your browser. Quick access when you need to grab a code!

### Preset Code Section

**Preset Code Field:** Enter a 6-character code from the database (gets auto-uppercased as you type)

**Fetch Button:** Click to load the preset configuration. When loaded, you'll see:
- Description of what the preset is for
- Creator name (if available)
- Target system name
- Number of TMPs and Triggers in the preset

**Don't have a code?** No worries! Enable "Manual Configuration" at the bottom to add TMPs and Triggers yourself.

### Configuration Section

#### Root GameObject
The GameObject that contains your TMP and trigger objects as children (or grandchildren, etc.). Usually the root of your prefab.

**Important:** The manager automatically detects if scripts already exist on your triggers when you select a GameObject!

#### Script Type
Choose which script to apply:
- **SyncedTagParserSimple:** Plain text player names. Uses only the first TMP in your list. Supports detection areas.
- **SyncedTagParserSimpleColored:** Colored/formatted player names. Can use multiple TMPs. No detection area needed.

Most people use Simple unless they want colored names.

### Parser Settings

These settings control how the detection script behaves:

#### Detect Players Anywhere
- **Default:** Uses the preset's setting (shown below the checkbox)
- **Override Checkbox:** Check this to override the preset default with your own value
- **What it does:** 
  - `true` = Detects all players in the world (ignores trigger zones)
  - `false` = Only detects players inside the trigger zones

For most use cases, you want this `false`. Only use `true` for things like global scoreboards.

#### Run Delay (seconds)
- **Default:** Uses the preset's setting (usually 5 seconds)
- **Override Checkbox:** Check this to use your own delay value
- **What it does:** How long to wait after the world loads before the script starts

Usually 5 seconds is fine. Increase it if you have other scripts that need to initialize first.

#### Create Detection Area (Simple script only)
- **Checkbox:** Whether to create a detection area GameObject
- **Detection Size:** Size of the BoxCollider (X, Y, Z)
- **Default:** 10 x 5 x 10

Only visible when using SyncedTagParserSimple. The detection area is created as a child of your Root GameObject (not the triggers).

### TMPs and Triggers Configuration

Shows two panels:

#### Known TMPs Panel
Lists all TMP objects that will be updated with player names. Shows count in the header.

**Sources:**
- TMPs from the loaded preset (shown first)
- Manual TMPs you've added (editable with ✕ remove buttons)

**Manual Mode:** Enable "Manual Configuration" below to add your own TMPs with the "+ Add TMP" button

#### Known Triggers Panel
Lists all trigger objects that will detect players. Shows count in the header.

**Sources:**
- Triggers from the loaded preset
- Manual Triggers you've added

**Manual Mode:** Enable "Manual Configuration" to add your own triggers with the "+ Add Trigger" button

### Manual Configuration Toggle
Check this to add your own TMPs and Triggers beyond what the preset provides. Great for:
- Using presets that don't have TMPs/Triggers configured
- Adding extra detection points to an existing preset
- Building completely custom setups without a preset

When enabled, you get "+ Add TMP" and "+ Add Trigger" buttons, plus the ability to edit and remove manual entries.

### 🔍 Debug: Show Active Arrays
Utility button that logs all active TMPs and Triggers to the console and shows a popup. Useful for troubleshooting!

### The Magic Button

**"✨ Tagify GameObject"** - Click this to apply the scripts!

The button text automatically changes to **"✏️ Modify GameObject"** if scripts are already detected on your triggers. You can safely click it again to update the configuration without breaking anything.

**Button is disabled if:**
- No Root GameObject is selected, or
- No TMPs or Triggers are configured

### What Happens When You Click It

1. **For Simple Script:**
   - Creates a "DetectionArea" GameObject as a child of your Root GameObject (if enabled)
   - Adds a BoxCollider to the detection area
   - Applies SyncedTagParserSimple to each trigger object
   - Assigns the first TMP to each trigger
   - Sets detectAnywhere and runDelay values
   - Links the detection area collider

2. **For Colored Script:**
   - Applies SyncedTagParserSimpleColored to each trigger object
   - Assigns all TMPs to each trigger (supports multiple!)
   - Sets runDelay value

3. **Success Dialog:** Shows how many triggers were configured successfully (or any errors)

Your triggers are now ready to detect players!

## The Stripper Tool

**Location:** `baloneys → Strip VRC Dynamic Player Tags`

This tool cleans up the Dynamic Tags system from a GameObject. Super useful when you want to start fresh or switch to a different preset.

### How to Use

1. Select your GameObject in the hierarchy
2. Open the Stripper tool
3. Click **"🔍 Search for Components"**
4. Review what it found (scripts and detection areas)
5. Choose what to remove:
   - ☑️ Strip UdonSharp Scripts
   - ☑️ Strip DetectionArea GameObjects
6. Click **"🗑️ Strip X Component(s)"**
7. Confirm the action
8. Everything's removed!

### What It Removes

- `SyncedTagParserSimple` scripts
- `SyncedTagParserSimpleColored` scripts
- UdonBehaviour components
- DetectionArea GameObjects (the colliders we create)

### Undo Support

Made a mistake? Press `Ctrl+Z` (or `Cmd+Z` on Mac) to undo the strip operation.

## Preset Database

I maintain a community database of presets at:
**https://kanaris-beans.com/dynabackend/vrc-dynamic-player-tags.html**

### Using Presets

1. Browse the database for your prefab
2. Copy the 6-character code (like `GMZ0NH`)
3. Paste it into the Manager's "Preset Code" field
4. Click "🔄 Load Preset"
5. Click "✨ Tagify GameObject"

Boom, done!

### Submitting Presets

Got a preset working for a popular prefab? Share it with the community!

1. Visit the [submission page](https://kanaris-beans.com/dynabackend/submissions.html)
2. Fill out the form with:
   - Target system name (e.g., "ModerateWinGuy's Spin the Wheel")
   - Description of what it's for
   - TMP object names
   - Trigger object names
   - Optional: Detect anywhere setting, run delay
3. Submit!

I'll review it and add it to the database so others can use it.

## Workflow Examples

### Example 1: Using a Preset Code

You found a preset code `GMZ0NH` for ModerateWinGuy's Spin the Wheel prefab.

**Steps:**
1. Open the Manager: `baloneys → VRC Dynamic Player Tags Manager`
2. Click "🌐 Open Preset Database" if you need to browse codes
3. Enter `GMZ0NH` in the Preset Code field
4. Click "Fetch"
5. Wait for the preset to load (you'll see the description appear)
6. Select your Spin the Wheel GameObject in the hierarchy
7. The manager auto-fills TMPs and Triggers from the preset
8. Click "✨ Tagify GameObject"

Done! The wheel now shows player names when they win.

### Example 2: Manual Configuration (No Preset)

You have a custom chair setup with no preset available.

**GameObject Structure:**
```
MyChair (select this as Root)
├── ChairTrigger (has a collider)
└── UI
    └── PlayerNameDisplay (TMP object)
```

**Steps:**
1. Open the Manager
2. Select "MyChair" as Root GameObject
3. Choose "SyncedTagParserSimple" as Script Type
4. Enable "Manual Configuration" at the bottom
5. Click "+ Add TMP" and type `PlayerNameDisplay`
6. Click "+ Add Trigger" and type `ChairTrigger`
7. Adjust "Detect Players Anywhere" to `false` (with override checked)
8. Click "✨ Tagify GameObject"

The chair now displays who's sitting in it!

### Example 3: Modifying an Existing Setup

You already tagified your GameObject but want to add more TMPs or change settings.

**Steps:**
1. Select your GameObject
2. Open the Manager (it auto-detects existing scripts)
3. Notice the button says "✏️ Modify GameObject" now
4. Enable "Manual Configuration"
5. Add new TMPs with "+ Add TMP"
6. Change parser settings if needed
7. Click "✏️ Modify GameObject"

Your scripts are updated without losing the existing setup!

### Example 4: Switching Presets

You set up with one preset but want to try a different one:

1. Select your GameObject
2. Open the Stripper: `baloneys → Strip VRC Dynamic Player Tags`
3. Click "🔍 Search for Components"
4. Check both "Strip UdonSharp Scripts" and "Strip DetectionArea GameObjects"
5. Click "🗑️ Strip X Component(s)" and confirm
6. Go back to the Manager
7. Enter the new preset code and click "Fetch"
8. Click "✨ Tagify GameObject"

Clean slate with the new preset!

### Example 5: Multiple Chairs with Colored Names

You have 3 chairs and want colored player names:

**GameObject Structure:**
```
ChairSystem (select this as Root)
├── Chair1
│   ├── Chair1Trigger
│   └── Chair1Name (TMP)
├── Chair2
│   ├── Chair2Trigger
│   └── Chair2Name (TMP)
└── Chair3
    ├── Chair3Trigger
    └── Chair3Name (TMP)
```

**Steps:**
1. Select "ChairSystem" as Root GameObject
2. Choose "SyncedTagParserSimpleColored" as Script Type
3. Enable "Manual Configuration"
4. Add TMPs: `Chair1Name`, `Chair2Name`, `Chair3Name`
5. Add Triggers: `Chair1Trigger`, `Chair2Trigger`, `Chair3Trigger`
6. Click "✨ Tagify GameObject"

All three chairs now show colored player names automatically!

### Example 6: Using Preset Override Settings

A preset has `detectAnywhere = true` but you want it `false` for your use case:

**Steps:**
1. Load the preset
2. Select your GameObject
3. Check the "Override" checkbox next to "Detect Players Anywhere"
4. Toggle "Detect Players Anywhere" to `false`
5. Click "✨ Tagify GameObject"

The preset TMPs/Triggers are used, but with your custom detection setting!

## How It Works (Technical)

For those curious about what's happening under the hood:

### SyncedTagParserSimple
1. **Detection Area:** A BoxCollider child of your Root GameObject (not the triggers) that detects OnPlayerTriggerEnter/Exit
2. **Syncing:** When a player enters, their display name is synced across all clients using Udon networking
3. **Single TMP:** Updates one TMP object with the synced player name
4. **Delay:** Optional delay (default 5s) prevents race conditions during world load
5. **Detect Modes:** 
   - `detectAnywhere = false`: Only updates when players are in the detection area
   - `detectAnywhere = true`: Updates for any player in the world (ignores trigger)

### SyncedTagParserSimpleColored
1. **Direct Trigger Detection:** Uses the trigger object's own collider (no separate detection area)
2. **Syncing:** Same player name syncing as Simple
3. **Multiple TMPs:** Can update multiple TMP objects simultaneously
4. **Formatting:** Supports rich text formatting and colors
5. **No Detection Area:** Relies entirely on trigger colliders

### Script Locations
The scripts are applied to each trigger object listed in your "Known Triggers" configuration. Each trigger gets its own independent instance of the script.

### Detection Flow
```
Player Enters Trigger
    ↓
OnPlayerTriggerEnter fires
    ↓
Player name captured
    ↓
Synced across network
    ↓
TMPs updated on all clients
    ↓
Player Exits Trigger
    ↓
TMPs cleared/reset
```

The scripts use UdonSharp for easy maintenance and readability.

## Troubleshooting

### "Nothing happens when I enter the trigger"

**Check:**
- Is the trigger's GameObject active?
- Does the trigger have a collider?
- Is "Is Trigger" checked on the collider?
- Are you testing in Play Mode, not Edit Mode?
- Wait for the run delay (default 5 seconds after world load)
- For Simple script: Is there a DetectionArea child under your Root GameObject?
- Is "Detect Players Anywhere" set correctly? (`false` for trigger-based, `true` for global)

### "TMP objects aren't updating"

**Check:**
- Are the TMP object names spelled exactly right? (Case sensitive!)
- Are the TMP objects children (or descendants) of the Root GameObject?
- Are the TMP objects active in the hierarchy?
- For Simple script: Only the first TMP in your list is used
- For Colored script: All TMPs should be assigned
- Look for errors in the console
- Click the "🔍 Debug: Show Active Arrays" button to see what the manager found

### "I get errors when clicking Tagify"

**Check:**
- Is UdonSharp installed and working?
- Are your Root GameObject, TMPs, and Triggers all set correctly?
- Do the trigger and TMP GameObjects actually exist in the hierarchy?
- Try clicking "🔍 Debug: Show Active Arrays" to verify your configuration
- Look at the console for specific error messages
- If errors persist, try stripping and re-applying

### "Detection area is huge/tiny"

The detection area defaults to 10x5x10. You can adjust it:

**Before creating:**
1. In the Manager, change "Detection Size" before clicking Tagify

**After creating:**
1. Find the "DetectionArea" child under your Root GameObject (not under triggers!)
2. Select it
3. Modify the BoxCollider size in the Inspector

**Note:** Detection areas are only created for SyncedTagParserSimple, not SyncedTagParserSimpleColored.

### "Players detected when they shouldn't be"

Make sure "Detect Players Anywhere" is set to `false`. If the override checkbox is checked and it's set to `true`, the script detects all players in the world, not just those in triggers.

Uncheck the override to use the preset default, or check it and set it to `false`.

### "I can't find the Detection Area"

**For SyncedTagParserSimple:**
- Look under your Root GameObject (the one you selected in "Root GameObject" field)
- It should be named "DetectionArea"
- It's created as a direct child of the root, not the trigger objects

**For SyncedTagParserSimpleColored:**
- This script doesn't use detection areas, so you won't find one!
- It relies on trigger colliders directly

### "Button says 'Modify' but I want to start fresh"

The manager detects existing scripts automatically. To start over:
1. Use the Stripper tool: `baloneys → Strip VRC Dynamic Player Tags`
2. Strip the components
3. Go back to the Manager
4. The button will say "Tagify" again

### "Manual entries disappear when I load a preset"

This is intentional! When you click "Fetch", the manager clears manual entries so the preset can load clean. If you want to keep manual entries:
1. Don't click Fetch again, or
2. Add your manual entries after loading the preset

## Known Limitations

- **Quest Compatibility:** Should work fine, but always test in Quest builds
- **Performance:** Each trigger adds a script instance. Don't go crazy with hundreds of them
- **Race Conditions:** If multiple players enter triggers simultaneously, last one wins
- **Late Joiners:** Players who join after someone's in a trigger will see the updated state (synced properly!)
- **No History:** Only shows current player, doesn't track who was there before
- **Simple Script - Single TMP:** SyncedTagParserSimple only uses the first TMP in your list
- **Simple Script - Shared Detection:** Detection area is created on the Root GameObject, shared by all triggers
- **Colored Script - No Detection Area:** SyncedTagParserSimpleColored relies on trigger colliders, no separate detection area
- **Manual Entry Clearing:** Clicking "Fetch" clears your manual TMPs/Triggers - add them after loading the preset

## Best Practices

1. **Test in Play Mode:** Always test your world in Play Mode before uploading
2. **Backup First:** Make a backup of your Unity project before importing
3. **Use Presets:** Save time by using community presets when available
4. **Name Consistently:** Use clear, descriptive names for TMPs and triggers
5. **One System Per Prefab:** Each independent system should be its own GameObject
6. **Check Console:** Watch for warnings or errors during setup

## Support & Community

Need help? Found a bug? Want to share a preset?

- **Discord:** https://discord.gg/gYWJsYhwXN (best way to reach me)
- **VRChat:** Find me at https://vrchat.com/home/user/usr_54097a4a-dab6-47ce-bcc5-00f39aa03555
- **Issues:** Open an issue on the GitHub if you find bugs
- **Database:** https://kanaris-beans.com/dynabackend/vrc-dynamic-player-tags.html

## Credits & License

Created by **baloneys** (that's me!)

**License:** See [Terms of Service](https://kanaris-beans.com/terms.html) for usage rights.

**TL;DR on License:**
- ✅ Use in your worlds (personal or commercial)
- ✅ Modify for your needs
- ✅ Use across multiple worlds
- ❌ Don't resell or redistribute
- ❌ Don't claim as your own

If you use this in your world, credit is appreciated but not required! Something like "Player detection by baloneys" in your world description or credits is awesome.

## Changelog

### v1.0.0 (Current)
- Initial release
- Manager tool for easy setup
- Stripper tool for cleanup
- Preset database system
- SyncedTagParserSimple script
- SyncedTagParserSimpleColored script
- Web interface for preset submission

## Roadmap

Things I'm thinking about adding:
- [ ] More formatting options for colored text
- [ ] History tracking (show last X players)
- [ ] Player join/leave events
- [ ] Custom text templates beyond just names
- [ ] VRChat avatar image display (if possible)
- [ ] Better Quest optimization

No promises on timeline, but I'm actively working on improvements!

## FAQ

**Q: Does this work with avatar scaling?**  
A: Yep, the detection uses VRChat's player tracking, so scaled avatars work fine.

**Q: Can I use this with other Udon scripts?**  
A: Yes! This doesn't interfere with other scripts on the same GameObject.

**Q: Do I need programming knowledge?**  
A: Nope! The Manager tool handles everything. Just fill in the fields and click Tagify.

**Q: Can I modify the scripts?**  
A: Absolutely! They're UdonSharp so they're readable and editable. Just don't redistribute the modified versions.

**Q: Will this break when VRChat updates?**  
A: I'll do my best to keep it compatible. If an update breaks something, hit me up on Discord.

**Q: Is this Quest compatible?**  
A: It should be! The scripts are simple and optimized. Test your world on Quest to be sure.

**Q: Can I use this in commissioned worlds?**  
A: Yes! Commercial use is allowed. See the license for details.

**Q: How do I update to a new version?**  
A: Just import the new package over the old one. Unity will update the files.

**Q: What's the difference between Simple and Colored scripts?**  
A: Simple uses one TMP and has a detection area. Colored supports multiple TMPs with rich text formatting but no detection area. Simple is easier for most use cases.

**Q: When should I use "Detect Players Anywhere"?**  
A: Use `false` (default) for location-specific detection like chairs or game zones. Use `true` for global displays like "Current World Champion" that should work anywhere.

**Q: Why does the Detection Area go on the Root GameObject and not the triggers?**  
A: This is by design for Simple script. It creates one shared detection area rather than individual ones per trigger. For more granular control, use triggers with their own colliders or switch to the Colored script.

**Q: Can I mix preset and manual TMPs/Triggers?**  
A: Yes! Enable "Manual Configuration" and add your own entries. They'll be combined with the preset's configuration.

**Q: What happens if I click "Fetch" after adding manual entries?**  
A: Manual entries are cleared when you load a new preset. Add your manual entries after fetching!

**Q: The button says "Modify" - will it break my setup?**  
A: Nope! The manager detects existing scripts and updates them safely. You can modify settings and re-apply without losing your configuration.

**Q: Can I have multiple presets on one GameObject?**  
A: Not recommended. Each trigger gets one script. If you need multiple behaviors, use separate GameObjects or manual configuration.

**Q: What's the "🔍 Debug: Show Active Arrays" button for?**  
A: It shows exactly which TMPs and Triggers the manager will use when you click Tagify. Super useful for troubleshooting!

---

Thanks for using VRCDynamicPlayerTags! I hope it makes your world creation easier. If you make something cool with it, feel free to share in my Discord - I love seeing what people create!

Happy world building! 🎉

*- bal*
