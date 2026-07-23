---
title: "Computer Vision Fundamentals"
description: "An introduction to how machines interpret images, covering image processing, CNNs, feature extraction, object detection, segmentation, and modern vision models."
category: "Computer Vision"
tags: ["Computer Vision", "CNN", "Image Processing", "Object Detection"]
author: "Param Pandya"
published: "June 10, 2024"
readingTime: "8 min read"
featured: false
coverImage: "/projects/deepfake.png"
slug: "computer-vision-fundamentals"
---

# Computer Vision Fundamentals: How Machines Learn to Understand Images

A human looking at a photo of a dog registers the floppy ears, the wet nose, the wagging tail almost instantly — the visual cortex does that work in milliseconds, without any conscious calculation. A computer starts from a very different place: an image isn't a picture to it at all, but a large grid of numbers.

Computer vision (CV) is the branch of artificial intelligence concerned with translating those numbers into something resembling visual understanding. What follows is a walk through how that translation happens, from raw pixels to a machine identifying an object.

## 1. Pixels: the digital mosaic

A mosaic made of small glass tiles looks like a solid block of color up close, and only resolves into an image once you step back far enough to see how the tiles relate to each other. A computer's view of an image works the same way.

Every image is a grid of pixels — short for "picture elements." In a grayscale image, each pixel is a single number between 0 (pure black) and 255 (pure white). In a color image, each pixel carries three such values, one each for red, green, and blue. A 1080p photo of a sunset isn't a sunset to the machine reading it; it's a grid holding more than two million of these number sets.

## 2. Feature detection: from lines to objects

Recognizing a face isn't a single step for a computer any more than it is for a person first learning to draw — it builds up in layers. An early layer scans for basic contrast: where light pixels meet dark ones to form a line or a curve. The next layer combines those lines into simple shapes — circles, corners, crosshatching. After that, shapes get grouped into recognizable parts, like an eye, a wheel, or a leaf. By the final layer, the system is evaluating the full assembly: two eyes, a nose, and fur add up to a golden retriever.

Convolutional neural networks (CNNs) are the algorithms that typically handle this layered feature extraction automatically, without a person specifying what an "edge" or an "eye" should look like in advance.

## 3. The core computer vision tasks

What it means for a machine to "understand" an image depends on the task it's been given.

| Task | What the Computer Is Asked | Real-World Example |
| --- | --- | --- |
| Image classification | What is the main thing in this image? | Sorting medical scans into "normal" or "abnormal" |
| Object detection | What is in this image, and where is it? | A self-driving car drawing boxes around pedestrians and traffic lights |
| Image segmentation | Which exact pixels belong to which object? | Background blurring in video calls or photo editors |

## 4. Seeing it in code: edge detection with OpenCV

Getting started with computer vision doesn't require much beyond Python and OpenCV, a widely used library for this kind of work. Detecting the edges in an image takes only a few lines:

```python
import cv2

# 1. Load the image from disk
image = cv2.imread('sample_photo.jpg')

# 2. Convert to grayscale
# (simplifies the image from 3 color channels down to 1)
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# 3. Apply Canny edge detection
# (finds sharp changes in brightness, where edges live)
edges = cv2.Canny(gray_image, threshold1=100, threshold2=200)

# 4. Display the result
cv2.imshow('Original Image', image)
cv2.imshow('Detected Edges', edges)
cv2.waitKey(0)
cv2.destroyAllWindows()
```

## The core idea

Strip away the specific tasks and computer vision comes down to converting light into a matrix of numbers, running filters over that matrix to pull out edges, shapes, and textures, and then making a decision based on the patterns that emerge — identifying a stop sign, unlocking a phone by face, or flagging an abnormal scan. Medical imaging and warehouse robots both run on the same basic pipeline underneath.
