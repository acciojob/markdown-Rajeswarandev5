import React, { useState, useEffect } from "react";

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const renderMarkdown = () => {
      let html = markdown;

      // Escape HTML
      html = html
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      // Headings
      html = html.replace(/^### (.*)$/gm, "<h3>$1</h3>");
      html = html.replace(/^## (.*)$/gm, "<h2>$1</h2>");
      html = html.replace(/^# (.*)$/gm, "<h1>$1</h1>");

      // Bold
      html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

      // Italic
      html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

      // Inline code
      html = html.replace(/`(.*?)`/g, "<code>$1</code>");

      // Links
      html = html.replace(
        /\[(.*?)\]\((.*?)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
      );

      // Unordered lists
      html = html.replace(/^\s*[-*] (.*)$/gm, "<li>$1</li>");

      // Wrap consecutive list items
      html = html.replace(
        /(<li>.*<\/li>\n?)+/g,
        (match) => `<ul>${match}</ul>`
      );

      // Line breaks
      html = html.replace(/\n/g, "<br />");

      setPreview(html);
      setLoading(false);
    };

    renderMarkdown();
  }, [markdown]);

  const handleChange = (event) => {
    setMarkdown(event.target.value);
  };

  return (
    <div className="markdown-editor">
      <div className="editor-section">
        <h2>Markdown Input</h2>

        <textarea
          value={markdown}
          onChange={handleChange}
          placeholder="Write your markdown here..."
          className="textarea"
        />
      </div>

      <div className="preview-section">
        <h2>Preview</h2>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div
            className="preview"
            dangerouslySetInnerHTML={{ __html: preview }}
          />
        )}
      </div>
    </div>
  );
};

export default MarkdownEditor;