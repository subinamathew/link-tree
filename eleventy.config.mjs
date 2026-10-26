export default function (eleventyConfig) {
  // Passthrough copy static assets
  eleventyConfig.addPassthroughCopy({ 'src/assets': 'assets' });
  eleventyConfig.addPassthroughCopy({ '_headers': '_headers' });

  // Filter items by active surface (supporting both local camelCase and Storyblok snake_case)
  eleventyConfig.addFilter('filterBySurface', (items, activeSurface) => {
    if (!Array.isArray(items)) return [];
    const surface = activeSurface || 'default';
    return items.filter(item => {
      const showOn = item.showOn || item.show_on;
      if (showOn && Array.isArray(showOn) && showOn.length > 0) {
        if (!showOn.includes(surface)) {
          return false;
        }
      }
      const hideOn = item.hideOn || item.hide_on;
      if (hideOn && Array.isArray(hideOn) && hideOn.length > 0) {
        if (hideOn.includes(surface)) {
          return false;
        }
      }
      return true;
    });
  });

  // Storyblok visual editor editable attribute
  eleventyConfig.addFilter('storyblokEditable', (blok) => {
    if (!blok || !blok._editable) return '';
    try {
      const clean = blok._editable
        .replace(/^<!--#storyblok#?\s*/, '')
        .replace(/-->$/, '')
        .trim();
      const options = JSON.parse(clean);
      const cStr = JSON.stringify(options).replace(/"/g, '&quot;');
      const uid = `${options.id}-${options.uid}`;
      return `data-blok-c="${cStr}" data-blok-uid="${uid}"`;
    } catch (e) {
      return '';
    }
  });

  // Convert Storyblok snake_case component names to Nunjucks Component names
  eleventyConfig.addFilter('blokToComponent', (componentName) => {
    const mapping = {
      profile_header: 'ProfileHeader.njk',
      link_button: 'LinkButton.njk',
      image_card_horizontal: 'ImageCardHorizontal.njk',
      image_card_vertical: 'ImageCardVertical.njk',
      video_link_card: 'VideoLinkCard.njk',
      section_heading: 'SectionHeading.njk',
      footer_legal: 'FooterLegal.njk',
      group_block: 'GroupBlock.njk',
      content_block: 'GroupBlock.njk',
      card_block: 'GroupBlock.njk',
    };
    return mapping[componentName] || `${componentName}.njk`;
  });

  // Extract YouTube video ID from URL
  eleventyConfig.addFilter('youtubeId', (url) => {
    if (!url) return '';
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : '';
  });

  return {
    dir: {
      input: 'src/content',
      includes: '../_includes',
      data: '../_data',
      output: '_site',
    },
    templateFormats: ['njk', 'html', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
}
