// Variable states
let selectedTone = 'Professional';
let selectedAudience = 'General Public';
let selectedLength = 'Concise and direct';

// Selectors
const rawIdeaInput = document.getElementById('raw-idea');
const generateBtn = document.getElementById('generate-btn');
const outputDisplay = document.getElementById('output-display');
const copyBtn = document.getElementById('copy-btn');
const copyText = document.getElementById('copy-text');

// Handle Toggle Option Buttons
setupToggleGroup('tone-group', (val) => selectedTone = val);
setupToggleGroup('audience-group', (val) => selectedAudience = val);
setupToggleGroup('length-group', (val) => selectedLength = val);

function setupToggleGroup(groupId, stateCallback) {
    const group = document.getElementById(groupId);
    const buttons = group.querySelectorAll('.option-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            group.querySelector('.option-btn.active').classList.remove('active');
            btn.classList.add('active');
            stateCallback(btn.getAttribute('data-value'));
            autoGenerate(); // Real-time update if user already typed something
        });
    });
}

// Preset Handlers
function applyPreset(type) {
    if (type === 'copywriting') {
        rawIdeaInput.value = "Create an engaging landing page hero section headline and subheadline for a modern habit tracker app.";
    } else if (type === 'coding') {
        rawIdeaInput.value = "Explain async/await in JavaScript and write an optimized fetch function with comprehensive error handling.";
    } else if (type === 'analysis') {
        rawIdeaInput.value = "Analyze the growth strategy of major quick-commerce platforms and breakdown their hyper-local logistics engine.";
    }
    autoGenerate();
}

// Prompt Generation Formula Engine
function generatePrompt() {
    const rawIdea = rawIdeaInput.value.trim();

    if (!rawIdea) {
        outputDisplay.innerHTML = `<span class="placeholder-text">Please enter a raw idea or task first to engineer your prompt!</span>`;
        return null;
    }

    // Engineering framework template
    const engineeredPrompt = `Act as an expert AI prompt engineer. Optimize and execute the following core task with precision:

[Core Task/Objective]:
"${rawIdea}"

[Execution Parameters & Constraints]:
- Tone & Voice: Adopt a tone that is strictly ${selectedTone}.
- Target Audience: Structure the explanations and vocabulary tailored explicitly for ${selectedAudience}.
- Formatting & Depth: Ensure the output layout is ${selectedLength}.

[Output Directives]:
Provide actionable insights, maintain clear contextual focus, and structure the data intuitively using rich markdown formatting where necessary. Avoid meta-commentary or generic introductory filler phrases.`;

    outputDisplay.innerText = engineeredPrompt;
    outputDisplay.classList.remove('placeholder-text');
    return engineeredPrompt;
}

// Trigger hooks
generateBtn.addEventListener('click', generatePrompt);

function autoGenerate() {
    if (rawIdeaInput.value.trim().length > 0) {
        generatePrompt();
    }
}

// Auto update prompt layout while typing
rawIdeaInput.addEventListener('input', autoGenerate);

// Copy to Clipboard Logic
copyBtn.addEventListener('click', () => {
    const currentPrompt = outputDisplay.innerText;
    
    if (outputDisplay.querySelector('.placeholder-text') || !currentPrompt) {
        return;
    }

    navigator.clipboard.writeText(currentPrompt).then(() => {
        copyBtn.classList.add('copied');
        copyText.innerText = 'Copied! ✓';
        
        setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyText.innerText = 'Copy Prompt';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});

