const svgCopy = '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg>';
const svgCheck = '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>';

function addCopyButtons() {
    document.querySelectorAll("pre > code").forEach((codeBlock) => {
        const button = document.createElement("button");
        button.className = "clipboard-button";
        button.type = "button";
        button.title = "复制代码";
        button.innerHTML = svgCopy;
        button.addEventListener("click", async () => {
            // 尝试使用现代 Clipboard API
            if (navigator.clipboard && navigator.clipboard.writeText) {
                try {
                    await navigator.clipboard.writeText(codeBlock.innerText);
                    button.innerHTML = svgCheck;
                    button.title = "已复制!";
                    setTimeout(() => {
                        button.innerHTML = svgCopy;
                        button.title = "复制代码";
                    }, 2000);
                } catch (error) {
                    console.error('复制失败 (Clipboard API):', error);
                    fallbackCopyTextToClipboard(codeBlock.innerText);
                }
            } else {
                // 回退到兼容性方法
                fallbackCopyTextToClipboard(codeBlock.innerText);
            }
        });
        const pre = codeBlock.parentNode;
        pre.parentNode.insertBefore(button, pre.nextSibling);
    });
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";  // 避免滚动到底部
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            console.log('使用兼容方法复制成功');
        } else {
            console.error('兼容方法复制失败');
        }
    } catch (err) {
        console.error('兼容方法复制出错:', err);
    }

    document.body.removeChild(textArea);
}

// 在 DOMContentLoaded 事件中调用函数
document.addEventListener('DOMContentLoaded', addCopyButtons);