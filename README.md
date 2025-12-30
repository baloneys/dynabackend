# VRCDynamicPlayerTags

> Dynamic player name tag replacement system for VRChat game text arrays

Hey there! This is a system I built to help VRChat world creators automatically replace player name tags in text arrays with actual player names during gameplay. Think of it like a plug-and-play solution for games like Never Have I Ever, Spin the Wheel, or Truth or Dare—where your prompts say things like "`<player>` must dance with `<rem_player>`" and the system automatically fills in real player names.

## What Does This Thing Do?

VRCDynamicPlayerTags lets you:
- Parse text arrays that contain special player name tags
- Automatically replace `<player>`, `<rem_player>`, and `<random>` tags with actual player names
- Use community-created presets for popular VRChat game prefabs
- Configure everything through a visual Unity Editor tool—no coding required

Perfect for:
- Never Have I Ever systems
- Spin the Wheel / Fortune Wheel games
- Truth or Dare prefabs
- Any game system that uses text prompts with player names

## How Tags Work

Your game's text arrays contain special tags that the system detects and replaces at runtime:

### `<player>` - Primary Player
The current or main player in the context.
- **Example:** "`<player>` won the game!" → "Alice won the game!"

### `<rem_player>` - Different Random Player
A different random player (not the same as `<player>`).
- **Example:** "`<player>` must kiss `<rem_player>`" → "Alice must kiss Bob"

### `<random>` - Any Random Player
Any random player from the world.
- **Example:** "`<random>` has to sing a song!" → "Charlie has to sing a song!"

Tags are replaced dynamically each time the text is displayed, so every round feels unique!

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

### Example 1: Using a Preset Code for Spin the Wheel

You found preset code `GMZ0NH` for ModerateWinGuy's Spin the Wheel prefab.

**Steps:**
1. Open the Manager: `baloneys → VRC Dynamic Player Tags Manager`
2. Click "🌐 Open Preset Database" if you need to browse codes
3. Enter `GMZ0NH` in the Preset Code field
4. Click "Fetch"
5. Wait for the preset to load (you'll see the description appear)
6. Select your Spin the Wheel GameObject in the hierarchy
7. The manager auto-fills TMPs and Triggers from the preset
8. Click "✨ Tagify GameObject"

Done! Your wheel prompts now display real player names instead of `<player>` tags.

### Example 2: Manual Configuration for Custom Game

You built a custom Never Have I Ever system with no preset available.

**GameObject Structure:**
```
NeverHaveIEver (select this as Root)
├── QuestionTrigger (has a collider)
└── UI
    └── QuestionText (TMP object with text like "Never have I ever kissed <player>")
```

**Steps:**
1. Open the Manager
2. Select "NeverHaveIEver" as Root GameObject
3. Choose "SyncedTagParserSimple" as Script Type
4. Enable "Manual Configuration" at the bottom
5. Click "+ Add TMP" and type `QuestionText`
6. Click "+ Add Trigger" and type `QuestionTrigger`
7. Click "✨ Tagify GameObject"

Your prompts now replace `<player>`, `<rem_player>`, and `<random>` tags automatically!

### Example 3: Truth or Dare with Multiple Text Objects

Your Truth or Dare game displays prompts on multiple TMP objects with colored text:

**GameObject Structure:**
```
TruthOrDare (select this as Root)
├── GameTrigger
├── MainPrompt (TMP: "Truth: <player> must tell <rem_player> a secret")
└── SecondaryPrompt (TMP: "Dare: <random> has to dance")
```

**Steps:**
1. Select "TruthOrDare" as Root GameObject
2. Choose "SyncedTagParserSimpleColored" as Script Type
3. Enable "Manual Configuration"
4. Add TMPs: `MainPrompt`, `SecondaryPrompt`
5. Add Trigger: `GameTrigger`
6. Click "✨ Tagify GameObject"

Both text objects now parse and replace player tags with colored formatting!

### Example 4: Modifying Tag Behavior

You already tagified your game but want to adjust detection settings:

**Steps:**
1. Select your GameObject
2. Open the Manager (it auto-detects existing scripts)
3. Notice the button says "✏️ Modify GameObject" now
4. Check "Override" next to "Detect Players Anywhere" and set to `false`
5. Adjust "Run Delay" if needed
6. Click "✏️ Modify GameObject"

Your scripts are updated without losing the configuration!

### Example 5: Switching Between Presets

You set up with one game preset but want to try a different one:

1. Select your GameObject
2. Open the Stripper: `baloneys → Strip VRC Dynamic Player Tags`
3. Click "🔍 Search for Components"
4. Check both "Strip UdonSharp Scripts" and "Strip DetectionArea GameObjects"
5. Click "🗑️ Strip X Component(s)" and confirm
6. Go back to the Manager
7. Enter the new preset code and click "Fetch"
8. Click "✨ Tagify GameObject"

Clean slate with the new game configuration!

## How It Works (Technical)

For those curious about what's happening under the hood:

### Tag Parsing System
1. **Text Arrays:** Your game prefab has TextMeshPro objects containing text with special tags
2. **Tag Detection:** The scripts scan the text for `<player>`, `<rem_player>`, and `<random>` tags
3. **Player Selection:** When tags are detected, the system selects appropriate players from the world
4. **String Replacement:** Tags are replaced with actual player display names
5. **Network Sync:** Replacements are synced across all clients so everyone sees the same names
6. **Dynamic Updates:** Tags are re-parsed each time the text changes or updates

### SyncedTagParserSimple
1. **Single TMP:** Parses one TextMeshPro object
2. **Trigger Detection:** Uses a detection area (BoxCollider) to know when to parse
3. **Tag Replacement:** Scans text for tags and replaces them with player names
4. **Delay:** Optional delay (default 5s) prevents race conditions during world load
5. **Detect Modes:** 
   - `detectAnywhere = false`: Only parses when triggered by detection area
   - `detectAnywhere = true`: Continuously parses regardless of triggers

### SyncedTagParserSimpleColored
1. **Multiple TMPs:** Can parse multiple TextMeshPro objects simultaneously
2. **Direct Trigger:** Uses trigger colliders directly (no separate detection area)
3. **Tag Replacement:** Same tag detection and replacement as Simple
4. **Formatting:** Supports rich text formatting and colors
5. **Network Sync:** Player selections synced across all clients

### Tag Replacement Flow
```
Game Displays Text
    ↓
"<player> won!" detected
    ↓
System selects player (e.g., Alice)
    ↓
Text replaced: "Alice won!"
    ↓
Synced to all clients
    ↓
Everyone sees "Alice won!"
```

### Script Locations
The scripts are applied to trigger objects in your game prefab. Each trigger gets its own instance of the script, which parses the associated TMP objects.

The scripts use UdonSharp for easy maintenance and readability.

## Troubleshooting

### "Tags aren't being replaced in my text"

**Check:**
- Are the tags spelled correctly? `<player>`, `<rem_player>`, `<random>` (case sensitive)
- Is the trigger's GameObject active?
- Are you testing in Play Mode, not Edit Mode?
- Wait for the run delay (default 5 seconds after world load)
- For Simple script: Is there a DetectionArea under your Root GameObject?
- Check the console for errors

### "TMP text doesn't update at all"

**Check:**
- Are the TMP object names spelled exactly right? (Case sensitive!)
- Are the TMP objects children (or descendants) of the Root GameObject?
- Are the TMP objects active in the hierarchy?
- For Simple script: Only the first TMP in your list is used
- For Colored script: All TMPs should be assigned
- Click "🔍 Debug: Show Active Arrays" to see what the manager found

### "I get errors when clicking Tagify"

**Check:**
- Is UdonSharp installed and working?
- Are your Root GameObject, TMPs, and Triggers all set correctly?
- Do the trigger and TMP GameObjects actually exist in the hierarchy?
- Try clicking "🔍 Debug: Show Active Arrays" to verify configuration
- Look at the console for specific error messages
- Try stripping and re-applying if errors persist

### "Wrong player names are being used"

**Check:**
- Is "Detect Players Anywhere" set correctly? (`false` for trigger-based, `true` for always-on)
- Are there enough players in the world for `<rem_player>` and `<random>` to work?
- `<rem_player>` requires at least 2 players
- Check if the tags are correctly written in your original text

### "Tags are replaced but with empty text"

This usually means no players are available:
- Make sure there are players in the world
- For `<rem_player>`, you need at least 2 players total
- For `<random>`, you need at least 1 player
- Check if "Detect Players Anywhere" needs to be `true` for your use case

### "Detection area is huge/tiny"

The detection area defaults to 10x5x10. You can adjust it:

**Before creating:**
1. In the Manager, change "Detection Size" before clicking Tagify

**After creating:**
1. Find the "DetectionArea" child under your Root GameObject
2. Select it
3. Modify the BoxCollider size in the Inspector

**Note:** Detection areas are only for SyncedTagParserSimple, not SyncedTagParserSimpleColored.

### "Button says 'Modify' but I want to start fresh"

The manager detects existing scripts automatically. To start over:
1. Use the Stripper tool: `baloneys → Strip VRC Dynamic Player Tags`
2. Strip the components
3. Go back to the Manager
4. The button will say "Tagify" again

### "Manual entries disappear when I load a preset"

This is intentional! When you click "Fetch", the manager clears manual entries so the preset can load clean. Add your manual entries after loading the preset.

### "My game prompts have special characters that break"

Make sure your text uses proper encoding:
- Tags must use angle brackets: `<player>` not `(player)` or `{player}`
- Don't escape the angle brackets in TextMeshPro
- Rich text tags (like `<color>`) won't conflict with player tags

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

**Q: What tags does the system recognize?**  
A: Three tags: `<player>` (main player), `<rem_player>` (different random player), and `<random>` (any random player).

**Q: Do I need to write my prompts a specific way?**  
A: Just include the tags anywhere in your text! Example: "Never have I ever kissed `<player>`" works perfectly.

**Q: Can I use multiple tags in one prompt?**  
A: Absolutely! "`<player>` must dance with `<rem_player>` while `<random>` watches" works great.

**Q: Does this work with avatar scaling?**  
A: Yep, it uses VRChat's player tracking so scaled avatars work fine.

**Q: Can I use this with other Udon scripts?**  
A: Yes! This doesn't interfere with other scripts on the same GameObject.

**Q: Do I need programming knowledge?**  
A: Nope! The Manager tool handles everything. Just fill in the fields and click Tagify.

**Q: Can I modify the scripts?**  
A: Absolutely! They're UdonSharp so they're readable and editable. Just don't redistribute modified versions.

**Q: Will this break when VRChat updates?**  
A: I'll do my best to keep it compatible. If an update breaks something, hit me up on Discord.

**Q: Is this Quest compatible?**  
A: Yes! The scripts are simple and optimized. Test your world on Quest to be sure.

**Q: Can I use this in commissioned worlds?**  
A: Yes! Commercial use is allowed. See the license for details.

**Q: What's the difference between Simple and Colored scripts?**  
A: Simple parses one TMP and has a detection area. Colored supports multiple TMPs with rich text formatting but no detection area. Simple is easier for most use cases.

**Q: When should I use "Detect Players Anywhere"?**  
A: Use `false` (default) for trigger-based games. Use `true` if your game should always parse tags regardless of player position.

**Q: Why does the Detection Area go on the Root GameObject?**  
A: This is by design for Simple script. It creates one shared detection area rather than individual ones per trigger.

**Q: Can I mix preset and manual TMPs/Triggers?**  
A: Yes! Enable "Manual Configuration" and add your own entries. They'll be combined with the preset's configuration.

**Q: The button says "Modify" - will it break my setup?**  
A: Nope! The manager detects existing scripts and updates them safely.

**Q: Can I have multiple game systems on one GameObject?**  
A: Not recommended. Each trigger gets one script. Use separate GameObjects for different games.

**Q: What's the "🔍 Debug: Show Active Arrays" button for?**  
A: It shows exactly which TMPs and Triggers the manager will use when you click Tagify. Super useful for troubleshooting!

---

Thanks for using VRCDynamicPlayerTags! I hope it makes your world creation easier. If you make something cool with it, feel free to share in my Discord - I love seeing what people create!

Happy world building! 🎉

*- bal*
