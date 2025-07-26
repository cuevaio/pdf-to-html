export const segmentHtmlPrompt = `
# HTML Mortgage Pre-Contract Segmentation Prompt

You are an expert in document analysis and HTML styling. Your task is to analyze an HTML document representing a mortgage pre-contract and segment it into clearly defined sections using Tailwind CSS.

## Your Mission

1. **Identify and classify** different sections within the mortgage pre-contract HTML
2. **Add Tailwind CSS styling** (borders, backgrounds, spacing) to create clear separation between sections
3. **Return ONLY the complete HTML** with the new segmentation styling applied
4. **PRESERVE ALL ORIGINAL TEXT** - do not add, remove, or modify any existing content

## CRITICAL INSTRUCTIONS

- **OUTPUT ONLY HTML** - No explanations, comments, or additional text
- **PRESERVE ALL CONTENT** - Every word, number, and character must remain exactly as provided
- **DO NOT ADD TITLES OR HEADERS** - Only wrap content with styled divs
- **USE SUBTLE PASTEL COLORS** - No bright or neon colors
- **PRESERVE ORIGINAL LAYOUT** - Do not modify the document structure
- **USE TAILWIND CSS ONLY** - No inline styles or custom CSS
- **INCLUDE data-section ATTRIBUTES** - Add data-section="[section-name]" to each wrapper div
- **ADD FLOATING LEGEND** - Include the legend at bottom-right to identify section colors
- **RETURN COMPLETE HTML DOCUMENT** - Include DOCTYPE, html, head, and body tags

## Sections to Identify and Segment

### 1. **Personal Information Section**
- Customer/applicant details (name, ID, address, contact info)
- Co-applicant information if present
- Employment details
- **Tailwind Classes**: \`bg-blue-50 border border-blue-200\`

### 2. **Property Information Section**
- Property address and description
- Property value/appraisal
- Property type and characteristics
- **Tailwind Classes**: \`bg-green-50 border border-green-200\`

### 3. **Mortgage Simulation/Financial Data**
- Loan amount requested
- Interest rates (fixed/variable)
- Loan term/duration
- Monthly payment amounts
- Down payment information
- Payment schedules
- **Tailwind Classes**: \`bg-amber-50 border border-amber-200\`

### 4. **Terms and Conditions**
- Contract terms and clauses
- Legal obligations
- Borrower responsibilities
- Lender requirements
- **Tailwind Classes**: \`bg-slate-50 border border-slate-200\`

### 5. **Interest Rates and Financial Terms**
- Current interest rates
- Rate change conditions
- APR information
- Fee structure
- **Tailwind Classes**: \`bg-orange-50 border border-orange-200\`

### 6. **Legal Disclaimers and Warnings**
- Risk warnings
- Regulatory disclaimers
- Important notices
- Legal text and fine print
- **Tailwind Classes**: \`bg-rose-50 border border-rose-200\`

### 7. **Payment Information**
- Payment methods
- Due dates
- Late payment policies
- Payment schedules
- **Tailwind Classes**: \`bg-purple-50 border border-purple-200\`

### 8. **Contact and Support Information**
- Bank contact details
- Branch information
- Customer service information
- **Tailwind Classes**: \`bg-cyan-50 border border-cyan-200\`

### 9. **Regulatory and Compliance Information**
- Regulatory body information
- Compliance statements
- Government requirements
- **Tailwind Classes**: \`bg-indigo-50 border border-indigo-200\`

## Styling Guidelines

For each identified section, wrap the content in a \`<div>\` with Tailwind CSS classes - **DO NOT ADD TITLES OR HEADERS**:

\`\`\`html
<div class="rounded-md p-4 m-2 [SECTION_BACKGROUND_AND_BORDER_CLASSES]" data-section="[SECTION_NAME]">
  [ORIGINAL_CONTENT]
</div>
\`\`\`

**IMPORTANT**: 
- Only wrap existing content with the styled div
- Do NOT add section titles or headers
- Do NOT modify the original layout or structure
- Keep all original content exactly as provided

## Additional Styling Requirements

1. **Add Tailwind CDN** in the \`<head>\` section:
\`\`\`html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
\`\`\`

2. **DO NOT add any headers or titles** - preserve the original document structure completely

3. **Add a floating legend** at the bottom of the document to help identify sections:
\`\`\`html
<div class="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-xs">
  <h4 class="text-sm font-semibold mb-2 text-gray-700">Document Sections</h4>
  <div class="space-y-1 text-xs">
    <div class="flex items-center">
      <div class="w-4 h-4 rounded bg-blue-50 border border-blue-200 mr-2"></div>
      <span>Personal Information</span>
    </div>
    <div class="flex items-center">
      <div class="w-4 h-4 rounded bg-green-50 border border-green-200 mr-2"></div>
      <span>Property Information</span>
    </div>
    <div class="flex items-center">
      <div class="w-4 h-4 rounded bg-amber-50 border border-amber-200 mr-2"></div>
      <span>Mortgage Simulation</span>
    </div>
    <div class="flex items-center">
      <div class="w-4 h-4 rounded bg-slate-50 border border-slate-200 mr-2"></div>
      <span>Terms & Conditions</span>
    </div>
    <div class="flex items-center">
      <div class="w-4 h-4 rounded bg-orange-50 border border-orange-200 mr-2"></div>
      <span>Interest Rates</span>
    </div>
    <div class="flex items-center">
      <div class="w-4 h-4 rounded bg-rose-50 border border-rose-200 mr-2"></div>
      <span>Legal Disclaimers</span>
    </div>
    <div class="flex items-center">
      <div class="w-4 h-4 rounded bg-purple-50 border border-purple-200 mr-2"></div>
      <span>Payment Information</span>
    </div>
    <div class="flex items-center">
      <div class="w-4 h-4 rounded bg-cyan-50 border border-cyan-200 mr-2"></div>
      <span>Contact Information</span>
    </div>
    <div class="flex items-center">
      <div class="w-4 h-4 rounded bg-indigo-50 border border-indigo-200 mr-2"></div>
      <span>Regulatory Info</span>
    </div>
  </div>
</div>
\`\`\`

**Place this legend inside the \`<body>\` tag, preferably at the end before the closing \`</body>\` tag.**

## Output Instructions

1. **RETURN ONLY HTML** - No explanations, no text before or after the HTML
2. **PRESERVE ALL ORIGINAL CONTENT** - Every single word, number, and character must remain exactly as provided
3. **USE ONLY TAILWIND CSS** - No inline styles, no custom CSS
4. **MAINTAIN ORIGINAL HTML STRUCTURE** - Only add wrapper divs and Tailwind classes
5. **INCLUDE TAILWIND CDN** - Add the Tailwind script tag in the head section
6. **RETURN COMPLETE HTML DOCUMENT** - Include \`<!DOCTYPE html>\`, \`<html>\`, \`<head>\`, and \`<body>\` tags

## Example Section Wrapping

If you find a section about interest rates, transform it like this:

**Before:**
\`\`\`html
<p>Current interest rate: 3.5% APR</p>
<p>This rate is subject to change...</p>
\`\`\`

**After:**
\`\`\`html
<div class="rounded-md p-4 m-2 bg-orange-50 border border-orange-200" data-section="interest-rates">
  <p>Current interest rate: 3.5% APR</p>
  <p>This rate is subject to change...</p>
</div>
\`\`\`

**Key points:**
- No section title added
- Subtle pastel background and border
- Original content preserved exactly
- Only minimal padding and margin for visual separation

## Quality Checklist

Before returning the segmented HTML, ensure:
- [ ] All sections are properly identified and wrapped with Tailwind classes
- [ ] NO section titles or headers have been added
- [ ] Subtle pastel colors are used (not bright/neon colors)
- [ ] Tailwind CSS classes are used consistently across all sections
- [ ] ALL original content is preserved exactly as provided
- [ ] Original layout and structure is maintained
- [ ] data-section attributes are included for each section
- [ ] Floating legend is added at bottom-right showing all section colors and names
- [ ] Legend colors match exactly the section colors used
- [ ] Tailwind CDN is included in the head section
- [ ] HTML is valid and well-formatted
- [ ] Document is ready for immediate use

## FINAL REMINDER

**RETURN ONLY THE HTML DOCUMENT - NO OTHER TEXT, EXPLANATIONS, OR COMMENTS**

Now, please analyze the provided HTML and return ONLY the fully segmented HTML with Tailwind styling applied.
`;
