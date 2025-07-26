# Markdown-to-HTML Visual Matching Task

## ⚠️ CRITICAL REQUIREMENTS

### Content Preservation (MANDATORY)
- **NEVER DELETE, MODIFY, OR ADD ANY CONTENT**: The markdown content must be preserved EXACTLY as provided
- **ZERO CONTENT CHANGES**: Do not rephrase, summarize, abbreviate, or alter any text in any way
- **COMPLETE CONTENT TRANSFER**: Every word, number, punctuation mark, and formatting element must be preserved
- **NO CREATIVE LIBERTIES**: Stick strictly to the provided content without interpretation or improvement
- **CRITICAL - TABLE DATA INTEGRITY**: Every single row, cell, and data point in tables MUST be included. Do not skip, summarize, or truncate table content. If there are 30 rows in the source, there must be 30 rows in the output. Missing data is completely unacceptable.

### Analysis Before Action (MANDATORY)
- **ANALYZE ALL CONTENT FIRST**: Before writing any HTML, thoroughly review ALL markdown content from ALL pages
- **UNDERSTAND COMPLETE CONTEXT**: Identify how content flows between pages and maintains logical continuity
- **IDENTIFY CONTENT PATTERNS**: Recognize repeating elements (headers, footers) across all pages before processing
- **MAINTAIN PAGE TRANSITIONS**: Ensure content flows seamlessly without losing context at page boundaries
- **PRESERVE CONTENT RELATIONSHIPS**: Understand how elements on different pages relate to each other
- **TABLE CONTINUITY ACROSS PAGES**: When tables span multiple pages, recognize that content split by page breaks belongs to the same table row. If text appears immediately after a page break without a new row identifier (a), b), etc.), it continues the previous row's description.

## Objective
Transform markdown content into styled HTML that visually matches provided PDF screenshots using Tailwind CSS classes.

## Input
- **Markdown Content**: Text content and structure from each page in markdown format
- **PDF Screenshots**: Images showing the visual layout and design of each corresponding page

## Task Requirements

### 1. Visual Fidelity
- Match typography (font sizes, weights, line heights, spacing) from screenshots
- Replicate layout structure (columns, sections, spacing, alignment) shown in images
- Preserve content hierarchy and visual relationships as seen in PDF
- Maintain responsive design principles where applicable

### 2. Content Structure
- **Headers**: Include only ONE header at the top of the document (extract from first occurrence across all pages)
- **Watermarks**: Notice any watermarks in the top of pages (generally in headers) and avoid duplicating them - include only ONE at the start of the document
- **Footers**: Include only ONE footer at the bottom of the document (extract from first occurrence across all pages)
- **Main Content**: Combine all page markdown content into a single flowing HTML document
- **Page Breaks**: Remove page-specific headers/footers and create seamless content flow

### 3. Table Recognition and Structure (CRITICAL)
- **Identify Tabular Data**: When content shows data organized in columns with headers (even if headers are subtle or implied), this MUST be converted to HTML table structure
- **COMPLETE TABLE PRESERVATION**: Every single row in the source table MUST be included in the HTML output. Count the rows in the source and verify the same count in your output. NEVER skip, omit, or summarize table rows.
- **NO PATTERN SUMMARIZATION**: Even if table rows appear repetitive or follow a pattern (like "Total año 1", "Total año 2", etc.), include every single row. Do not assume patterns can be abbreviated or represented with "..." or similar shortcuts.
- **Recognize Header Spanning**: Look carefully for headers that span across multiple sub-columns. If a main header has sub-headers beneath it, the main header must use `colspan` to span the correct number of sub-columns. Example: if "Main Header A" has "Sub Header 1" and "Sub Header 2" beneath it, then "Main Header A" needs `colspan="2"`.
- **Multi-Page Table Handling**: Tables may span across multiple pages. When content continues from one page to another WITHOUT a new row identifier (like a), b), c), etc.), that content belongs to the SAME table row as the previous identifier. Combine such split content into a single `<td>` element.
- **Page Break Example**: If page 1 ends with "f) Item Name" and page 2 starts with additional descriptive text (without g), h), etc.), that text is part of the "f)" row, not a separate row. Combine them: `<td>f) Item Name [combined with continuation text from next page]</td>`
- **Required Table Elements**: 
  - `<table>` wrapper with Tailwind styling
  - `<thead>` with `<tr>` and `<th>` elements for all column headers
  - `<tbody>` with `<tr>` and `<td>` elements for data rows
  - Each `<tr>` must have the exact same number of `<td>` cells as there are `<th>` headers
- **Multi-level Headers**: When headers span multiple sub-columns, use `colspan` attribute on `<th>` elements. Create separate `<tr>` rows in `<thead>` for each header level. The top-level header should span the correct number of sub-columns beneath it.
- **Header Structure Example**: For a table with "Main Header A" spanning "Sub Column 1" and "Sub Column 2", and "Main Header B" spanning only "Sub Column 3":
  ```
  <thead>
    <tr>
      <th rowspan="2">Row Items</th>
      <th colspan="2">Main Header A</th>
      <th colspan="1">Main Header B</th>
    </tr>
    <tr>
      <th>Sub Column 1</th>
      <th>Sub Column 2</th>
      <th>Sub Column 3</th>
    </tr>
  </thead>
  ```
- **Column Headers**: Always include ALL column headers, even if they appear faint or subtle in the screenshot
- **Data Alignment**: Each data value must appear in the correct column under its corresponding header
- **Empty Cells**: Use empty `<td></td>` tags (not missing tags) when a cell has no data to maintain table structure
- **Continuation Recognition**: Look for patterns like numbered/lettered lists (a), b), c)) - if content appears after a page break without the next identifier in sequence, it continues the previous row
- **Styling**: Apply Tailwind classes for proper spacing, borders, and alignment to match screenshot appearance

### 4. Styling Guidelines
- Use ONLY Tailwind CSS utility classes
- Include Tailwind CSS via this script tag: `<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>`
- Convert markdown content to appropriate HTML structure (headings, paragraphs, lists, tables, etc.)
- Add divs, wrappers, containers as needed for layout matching screenshots
- Focus on layout, typography, spacing, and visual hierarchy as shown in images
- Apply consistent styling patterns throughout the document
- Use `/placeholder.svg` for any images or visual assets, with Tailwind sizing classes to match the dimensions shown in screenshots
- Add descriptive alt text attributes to all images for accessibility

### 5. Document Layout and Responsive Design (CRITICAL)
- **A4 Width Proportions**: Structure the document width to match A4 PDF width proportions (210mm width) - height is unlimited like a webpage
- **Container Width**: Use a main container with `max-w-4xl` (896px) or similar to approximate A4 document width - no height restrictions
- **Horizontal Fit**: ALL content must fit horizontally within the container - no horizontal scrolling allowed
- **Document Structure**: Wrap all content in a centered container:
  ```html
  <div class="min-h-screen bg-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- All document content here -->
    </div>
  </div>
  ```
- **Table Responsiveness**: For wide tables that might overflow:
  - Wrap tables in responsive containers: `<div class="overflow-x-auto"><table class="min-w-full">...</table></div>`
  - Apply `text-xs sm:text-sm md:text-base` for responsive text sizing in table cells
  - Use `px-1 sm:px-2 md:px-3` for responsive cell padding
  - For extremely wide tables, prioritize readability: reduce font size and padding to fit within A4 document width
  - Example structure for large tables:
    ```html
    <div class="overflow-x-auto border border-gray-200 rounded-lg">
      <table class="min-w-full text-xs sm:text-sm divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-1 sm:px-2 md:px-3 py-2 text-left">...</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr>
            <td class="px-1 sm:px-2 md:px-3 py-2 whitespace-nowrap">...</td>
          </tr>
        </tbody>
      </table>
    </div>
    ```
- **Media Query Considerations**: 
  - Ensure readability on mobile devices (min-width: 320px)
  - Use responsive text sizes: `text-sm md:text-base lg:text-lg`
  - Apply responsive spacing: `p-2 md:p-4 lg:p-6`
  - Scale images responsively: `w-full max-w-xs md:max-w-sm lg:max-w-md`
- **Typography Scaling**: Use Tailwind's responsive typography:
  - Headers: `text-lg md:text-xl lg:text-2xl` (adjust based on screenshot hierarchy)
  - Body text: `text-sm md:text-base`
  - Small text: `text-xs md:text-sm`
- **Content Fitting**: If content is too wide for A4 width:
  - Reduce font sizes responsively
  - Adjust padding and margins
  - Use text wrapping and word breaks where appropriate
  - Never allow horizontal overflow - content MUST fit within the container
- For tables: Use proper HTML table structure (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`). ALWAYS include column headers even if they appear subtle in the screenshot. When main headers span multiple sub-columns, use `colspan` on the main header and create multiple header rows. MANDATORY ROW COUNT: Include every single row from the source table without exception - verify your row count matches the source exactly. BE CAUTIOUS with multi-page tables - content split across pages without new row identifiers belongs to the same row. Maintain exact column alignment - each data cell must align with its corresponding header. Include empty `<td></td>` cells where data is missing to preserve table structure. Style tables with Tailwind classes for borders, spacing, and alignment to match the visual appearance in screenshots.

### 6. Key Elements to Address
- **Typography**: Headings, body text, captions, lists, emphasis (match screenshot styles)
- **Layout**: Grid systems, flexbox, positioning (replicate PDF layout)
- **Spacing**: Margins, padding, gaps between elements (match screenshot spacing)
- **Visual Hierarchy**: Size relationships, emphasis, grouping (as shown in PDF)
- **Alignment**: Text alignment, element positioning (replicate PDF alignment)
- **Images**: Size placeholder images using Tailwind classes to match screenshot dimensions, include descriptive alt text
- **Tables**: CRITICAL - When you see data organized in columns with headers, this MUST be converted to proper HTML table structure. Look for column headers (even if subtle) and ensure each data row aligns perfectly with these headers. Pay special attention to headers that span multiple sub-columns - use `colspan` and `rowspan` attributes. VITAL DATA INTEGRITY: Include every single row from the source table - do not skip, truncate, or summarize any rows. If the source has 30 data rows, your HTML must have 30 data rows. IMPORTANT: Tables may continue across pages - if content follows a row identifier (like "f) Item Name") on the next page WITHOUT a new identifier, it belongs to the SAME row. Use `<table>`, `<thead>`, `<tbody>` structure. Never present tabular data as simple text lists.
- **Document Flow**: Seamless integration of content from multiple pages

### 7. Quality Standards
- Ensure clean, maintainable Tailwind class usage
- Avoid redundant or conflicting classes
- Use semantic color and spacing scale (e.g., text-gray-800, mb-6)
- Maintain accessibility considerations (contrast, text sizes)
- Create logical document structure and flow
- **A4 WIDTH COMPLIANCE**: Verify the document renders within A4-like width using the specified container structure (height can extend as needed)
- **NO HORIZONTAL OVERFLOW**: Test that all content fits horizontally within the max-width container at all screen sizes
- **RESPONSIVE VERIFICATION**: Ensure content remains readable and properly formatted on both desktop (1024px+) and mobile (320px+) viewports
- **TABLE WIDTH MANAGEMENT**: Confirm that tables either fit within the container or use horizontal scroll containers appropriately
- **MANDATORY DATA VERIFICATION**: Before completing, verify that ALL table rows from the source are included in your output. Count them to ensure 100% data preservation. Missing table data is a critical failure.

## Output Format
Return the complete HTML document with Tailwind classes applied. Include:
- Document header (once at the top, extracted from pages)
- All page content converted from markdown to styled HTML
- Document footer (once at the bottom, extracted from pages)
- Tailwind CSS classes applied to match screenshot appearance
- Required Tailwind CSS script tag in the head section
- **MANDATORY A4 Container Structure**: Use the specified container structure with `max-w-4xl` to maintain A4 width proportions (height unlimited)
- **Responsive Design Implementation**: Include responsive classes throughout for mobile compatibility
- Additional HTML structure (divs, wrappers, containers) as needed for layout
- **Horizontal Fit Guarantee**: Ensure ALL content fits within the container width without overflow
- No additional text, explanations, or markdown formatting
- Valid HTML structure maintained
- Must return the full styled HTML document

### Formatting Requirements
- **DO NOT** start the response with ```html
- **DO NOT** end the response with ```
- Return ONLY the raw HTML content without any markdown code block formatting

## Important Notes
- The screenshots represent the visual target for styling each page's content
- Combine all pages into one cohesive HTML document without page breaks
- Identify and extract headers/footers that repeat across pages - use only once
- Focus on overall layout and typography matching rather than pixel-perfect reproduction
- If uncertain about specific measurements, use standard Tailwind spacing scales
- Prioritize clarity and readability in the final result
- Replace any image sources with `/placeholder.svg`
- Maintain the logical flow and structure of the original document content